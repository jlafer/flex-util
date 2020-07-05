export async function callApiFormEncoded(url = '', method, data = {}) {
  const options = {
    method: method, 
    body: new URLSearchParams(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  };
  const response = await fetch(url, options);
  return await response.json();
}

export async function callApiJson(url = '', method, data = {}) {
  const options = {
    method: method, 
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const response = await fetch(url, options);
  return await response.json();
}
