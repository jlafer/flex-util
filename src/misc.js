import {assoc, mergeRight} from 'ramda';

export function formatPhoneNum(phoneNumber) {
  if (phoneNumber.startsWith('('))
    return phoneNumber;
  const rawNum = (phoneNumber.startsWith('+1'))
    ? phoneNumber.substring(2)
    : phoneNumber;
  const areaCode = rawNum.substring(0,3);
  const npa = rawNum.substring(3,6);
  const nxx = rawNum.substring(6);
  return `(${areaCode}) ${npa}-${nxx}`  
}

export function getPluginConfiguration(manager, namespace) {
  const {serviceConfiguration, configuration} = manager;
  const svcConfig = (serviceConfiguration && serviceConfiguration.attributes)
    ? serviceConfiguration.attributes[namespace]
    : null;
  if (! svcConfig) {
    console.log(`WARNING: attributes.${namespace} not configured in configuration service`);
    console.log(`That will be needed for deployment to flex.twilio.com. See README for instructions.`);
  }
  const appConfig = (configuration && configuration.attributes)
  ? configuration.attributes[namespace]
  : null;
  return svcConfig || appConfig;
}

export const addDataToTaskConversations = (task, data) => {
  const conversations = mergeRight(task.attributes.conversations, data);
  return assoc('conversations', conversations, task.attributes);
};
