# jlafer-flex-util

This is a library of utility functions for use in Twilio Flex development.

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

## Network/Ajax Functions

### callApiFormEncoded(url, method, data)
```
callApiFormEncoded :: (string, string, object) -> Promise(any)
```
```javascript
  callApiFormEncoded('https://my-api.com/endpoint', 'POST', {foo: 'bar'});
```
### callApiJson(url, method, data)
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

### getSyncClientAndMap(mapCallback, itemCallback, mapName, token)
```
getSyncClientAndMap :: (function(syncMap), function(syncEvent), string, string) -> undefined
```
```javascript
  getSyncClientAndMap(myMapCallback, myItemCallback, 'TestMap', syncToken);
```

### setSyncMapItem(map, key, data, ttl)
```
setSyncMapItem :: (syncMap, string, any, number) -> undefined
```
```javascript
  setSyncMapItem(mySyncMap, 'item-key', itemData, 300);
```
