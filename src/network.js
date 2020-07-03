export function callJsonApi(url, method, data) {
  const options = {
    method: method, 
    body: new URLSearchParams(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  };
  return fetch(url, options)
  .then(response => response.json())
  .catch(err => {
      console.error(err);
  });
};
