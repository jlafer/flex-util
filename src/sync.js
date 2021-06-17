// imports here - they must go above requires
import * as R from 'ramda';
//import SyncClient from "twilio-sync";

// NOTE: these pkgs must be required - not imported
const SyncClient = require('twilio-sync');

export const getSyncDoc = R.curry((docCallback, docName, token, options) => {
  const clientOptions = {
    logLevel: "info"
  };
  const client = new SyncClient(token, clientOptions);

  client.on("connectionStateChanged", state => {
    console.log('getSyncClientAndDoc.connectionState: ', {state});
  });

  const docOptions = {id: docName, ...options};
  return client.document(docOptions).then(doc => {
    console.log('getSyncClientAndDoc: opened doc:', {sid: doc.sid});
    doc.on("updated", docCallback);
    return doc;
  });
});

export const getSyncClientAndMap = R.curry((mapCallback, itemCallback, mapName, token) => {
  const options = {
    logLevel: "info"
  };
  const client = new SyncClient(token, options);

  client.on("connectionStateChanged", state => {
    console.log('getSyncClientAndMap.connectionState: ', {state});
  });

  client.map({id: mapName, ttl: 1800}).then(map => {
    console.log('getSyncClientAndMap: opened map:', {sid: map.sid});
    map.on("itemAdded", itemCallback);
    map.on("itemUpdated", itemCallback);
    mapCallback(map);
  });
});

export const setSyncMapItem = (map, key, data, ttl) => {
  map.set(key, data, {ttl})
  .then(function(item) {
    //console.log('setSyncMapItem successful');
  })
  .catch(function(error) {
    console.error('setSyncMapItem failed', error);
  });
};
