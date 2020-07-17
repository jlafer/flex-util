import base64 from 'base-64';
import {curry, isEmpty} from 'ramda';

// Deprecated in favor of callApi() below
export async function callApiFormEncoded(url = '', method, data) {
  const options = {
    method: method, 
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  };
  if (!! data)
    options.body = new URLSearchParams(data);
  const response = await fetch(url, options);
  return await response.json();
}

// Deprecated in favor of callApi() below
export async function callApiJson(url = '', method, data) {
  const options = {
    method: method, 
    headers: {'Content-Type': 'application/json'}
  };
  if (!! data)
    options.body = JSON.stringify(data);
  const response = await fetch(url, options);
  return await response.json();
}

export function setBaseOptions() {
  return {
    headers: {
      'Content-Type': 'application/json'
    }
  };
}

export const addTokenAsData = curry((Token, options) => {
  const body = {...options.body, Token};
  return {...options, body};
});

export const addFlexToken = curry((manager, options) => {
  const Token = manager.store.getState().flex.session.ssoTokenPayload.token;
  return addTokenAsData(Token, options);
});

export const addHeader = curry((key, value, options) => {
  const headers = {...options.headers, [key]: value};
  return {...options, headers};
});

export const addAuthorization = curry((authType, authStr, options) => {
  return addHeader('Authorization', `${authType} ${authStr}`, options);
});

export const addBasicCredentials = curry((username, password, options) => {
  const authStr = base64.encode(`${username}:${password}`);
  return addAuthorization('Basic', authStr, options);
});

export const addBearerToken = curry((token, options) => {
  return addAuthorization('Bearer', token, options);
});

const encodings = {
  json: 'application/json',
  form: 'application/x-www-form-urlencoded'
};

export const setEncoding = curry((encoding, options) => {
  const contentType = encodings[encoding];
  return addHeader('Content-Type', contentType, options);
});

export const makeOptions = (baseOptions, method, data) => {
  const options = {...baseOptions, method};
  const allData = {...options.body, ...data};
  if (isEmpty(allData))
    return options;
  if (options.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
    options.body = new URLSearchParams(allData);
    options.headers['Content-length'] = options.body.length;
  }
  else
    options.body = JSON.stringify(allData);
  return options;
};

export const callApi = (baseOptions, url, method, data) => {
  const options = makeOptions(baseOptions, method, data);
  console.log(`calling fetch of ${url} with options:`, options);
  return fetch(url, options);
}