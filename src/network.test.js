import base64 from 'base-64';
import {pipe} from 'ramda';
import {
  setBaseOptions, addBasicCredentials, addBearerToken, addTokenAsData, addHeader,
  makeOptions
} from './index'

// TODO need test case for encoding == 'form'

const baseURL = 'https://my-api.com';
const baseOptions = {
  headers: {
    'Content-Type': 'application/json'
  }
};

test("setBaseOptions returns obj with Content-Type", () => {
  expect(setBaseOptions()).toEqual(baseOptions);
});
test("addBasicCredentials returns baseOptions with basic credentials", () => {
  const configureApi = pipe(setBaseOptions, addBasicCredentials('foo', 'bar'));
  const authStr = base64.encode(`foo:bar`);
  expect(configureApi()).toEqual({
    ...baseOptions,
    headers: {
      ...baseOptions.headers,
      Authorization: `Basic ${authStr}`
    }
  });
});
test("addBearerToken returns baseOptions with Bearer credentials", () => {
  const configureApi = pipe(setBaseOptions, addBearerToken('foo'));
  expect(configureApi()).toEqual({
    ...baseOptions,
    headers: {
      ...baseOptions.headers,
      Authorization: 'Bearer foo'
    }
  });
});
test("addHeader returns baseOptions with custom header", () => {
  const configureApi = pipe(setBaseOptions, addHeader('foo', 'bar'));
  expect(configureApi()).toEqual({
    ...baseOptions,
    headers: {
      ...baseOptions.headers,
      foo: 'bar'
    }
  });
});
test("addTokenAsData returns baseOptions with token in data", () => {
  const configureApi = pipe(setBaseOptions, addTokenAsData('foo'));
  expect(configureApi()).toEqual({
    ...baseOptions,
    body: {
      ...baseOptions.body,
      Token: 'foo'
    }
  });
});
test("makeOptions returns proper options", () => {
  const configureApi = pipe(setBaseOptions, addTokenAsData('foo'));
  const options = configureApi();
  const data = {Token: 'foo', species: 'Owl'};
  const body = JSON.stringify(data);
  expect(makeOptions(options, 'post', data)).toEqual({
    ...baseOptions,
    body: body,
    method: 'post'
  });
});
