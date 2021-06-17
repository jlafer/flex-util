# jlafer-flex-util

This is a library of utility functions for use in Twilio Flex development.

NOTE: THIS LIBRARY IS CURRENTLY UNDERGOING MASSIVE CHURN SO USER BEWARE. Once it is sufficiently stable, the version number will bump to 1.0.x. My apologies if you've been trying to use it as I discover and correct usability issues and bugs. :-( (jlafer)

## Installation

npm install --save jlafer-flex-util

## Components and JSX Functions

### ClickablePhoneNum(number, onClick)
```
ClickablePhoneNum :: (string, function) -> HTML
```
```javascript
<ClickablePhoneNum
  number={consumerPhone}
  onClick={(e) => this.clickToDial(consumerPhone, e)}
/>
```
### field(name, label, value)
```
field :: (string, string, string) -> HTML
```
```javascript
field('AccountNumber', 'Account', merchantAcct)
```
## Miscellaneous Functions

### addDataToTaskConversations(task, data)
This function sets one or more keys (all those in the `data` object parameter) in the `conversations` object within the `attributes` property of the `task` parameter. It then returns a copy of the task attributes reflecting the new data. This can be useful for things like updating the task reason or passing custom attributes and measures to Flex Insights.

NOTE: this is a pure function; it does NOT mutate the underlying TaskRouter Task object. For that, you can call the `ITask.setAttributes` method, as demonstrated below.
```
addDataToTaskConversations :: (ITask, object) -> object
```
```javascript
  const attributes = addDataToTaskConversations(task, {conversation_attribute_3: 'SaleMade'});
  task.setAttributes(attributes);
```

### formatPhoneNum(phoneNumber)
```
formatPhoneNum :: string -> string
```
```javascript
  const formattedNum = formatPhoneNum('8005551212');   // (800) 555-1212
```
```javascript
  const formattedNum = formatPhoneNum('+18005551212'); // (800) 555-1212
```

### getPluginConfiguration(manager, namespace)
```
getPluginConfiguration :: (manager, string) -> object
```
```javascript
  const configuration = getPluginConfiguration(manager, 'my_plugin');
```

## Network Functions
The library provides a collection of functions -- most of them curried -- for constructing API clients that support various schemes for encoding parameters, authenticating and authorizing requests, adding custom HTTP headers and specifying HTTP methods.

While the functions can be used in an imperative manner, they've been designed to support a functional programming style. So the suggested usage might look something like this:
```javascript
import {pipe} from 'ramda';
import {setBaseOptions, addBearerToken, addHeader, setEncoding, callApi} from 'jlafer-flex-util';

const configureApi = pipe(
  setBaseOptions,
  addBearerToken('my-jwt-token'),
  addHeader('X-My-Header', 'foo'),
  setEncoding('form')
);
const myApiOptions = configureApi();

const bird = {species: 'Owl', name: 'Hootie'};
const response = await callApi(myApiOptions, '/animals', 'post', bird);
``` 

### setBaseOptions()
This function is not curried and can be used to start a function composition. It returns an options object that is then passed to other helper functions, which enhance the options and then pass it along.
```
setBaseOptions :: () -> object
```
```javascript
  const baseOptions = setBaseOptions();
```
### addBasicCredentials(username, password, options)
This curried function adds Basic authentication credentials to the API client options.
```
addBasicCredentials :: (string, string) -> object -> object
```
```javascript
  const newOptions = addBasicCredentials('my-username', 'my-password', options);
```
### addBearerToken(token, options)
This curried function adds a Bearer token to the API client options.
```
addBearerToken :: string -> object -> object
```
```javascript
  const newOptions = addBearerToken('my-bearer-token', options);
```
### addFlexToken(manager, options)
This curried function adds a Twilio Flex access token to the API client options. This is useful when calling Twilio APIs in a secure manner. For convenience, it takes as an argument a Flex `manager` object, from which it obtains the current Flex token value.
```
addFlexToken :: string -> object -> object
```
```javascript
  const newOptions = addFlexToken(manager, options);
```
### addTokenAsData(token, options)
This curried function adds a JWT access token to the API client options. The resulting API client will pass the token to the API endpoint in the `Token` key inside the parameters or JSON body of the request. This is useful when calling certain APIs, such as those from Twilio, in a secure manner.
```
addTokenAsData :: string -> object -> object
```
```javascript
  const newOptions = addTokenAsData('my-flex-token', options);
```
### addHeader(key, value, options)
This curried function adds an HTTP header to the API client options.
```
addHeader :: (string, string) -> object -> object
```
```javascript
  const newOptions = addHeader('X-My-Header', 'foo', options);
```
### setEncoding(encoding, options)
This curried function adds a `Content-type` header to the request and ensures that the data is sent with the proper encoding. By default, the data is treated as `json` and the `Content-type` header is set to `application/json`. Call this function with `encoding` set to `form` to set the content type to `application/x-www-form-urlencoded`.
```
setEncoding :: string -> object -> object
```
```javascript
  const newOptions = setEncoding('form', options);
```
### callApi(options, url, method, data)
This function is not curried and is used to call an API with the options created using the other helper functions. It returns a Promise that resolves to a `fetch` `Response` object or an `Error` object.
```
callApi :: (object, string, string, object) -> Response
```
```javascript
  callApi(options, '/animals', 'post', bird);
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });
```

### callApiFormEncoded(url, method, data)
NOTE: I consider this function deprecated in favor of the `callApi` scheme above.
```
callApiFormEncoded :: (string, string, object) -> Promise(any)
```
```javascript
  callApiFormEncoded('https://my-api.com/endpoint', 'POST', {foo: 'bar'});
```
### callApiJson(url, method, data)
NOTE: I consider this function deprecated in favor of the `callApi` scheme above.
```
callApiJson :: (string, string, object) -> Promise(any)
```
```javascript
  callApiJson('https://my-api.com/endpoint', 'POST', {foo: 'bar'});
```

## Console Logging

### log
```javascript
import {log} from 'jlafer-flex-util';

log.debug('this is a debug message');
const obj = {foo: 'bar'};
log.debug('this is a debug message with data', obj);
log.info('this is an informational message');
log.warn('this is a warning message');
log.error('this is an error message');
```

## Sync Functions

### getSyncDoc(docCallback, docName, syncToken, options) (curried)
```
getSyncDoc :: function(document) -> string -> string -> object -> undefined
```
```javascript
  getSyncDoc(docCallback, 'AgentStats@johndoe', mySyncToken, {mode: 'open_or_create', ttl: 3600});
```

### getSyncClientAndMap(mapCallback, itemCallback, mapName, syncToken) (curried)
```
getSyncClientAndMap :: function(map) -> function(item) -> string -> string -> undefined
```
```javascript
  getSyncClientAndMap(myMapCallback, myItemCallback, 'MyTestMap', mySyncToken);
```

### setSyncMapItem(map, key, data, ttl)
```
setSyncMapItem :: (syncMap, string, any, number) -> undefined
```
```javascript
  setSyncMapItem(mySyncMap, 'my-item-key', itemData, 300);
```
