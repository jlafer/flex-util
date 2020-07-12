export const log = (function () {
  const levels = {
    error: 1,
    warn: 2,
    info: 3,
    debug: 4
  };
  let logLevel = levels.info;
  let logName = '';
  const format = (message) => {
    return `${logName} ${new Date()}: ${message}`;
  };
  const logMsg = (message) => {
    console.log(format(message));
  };
  const debug = (message) => {
    if (logLevel >= levels.debug)
      logMsg(message);
  };
  const info = (message) => {
    if (logLevel >= levels.info)
      logMsg(message);
  };
  const warn = (message) => {
    if (logLevel >= levels.warn)
      logMsg(message);
  };
  const error = (message) => {
    logMsg(message);
  };
  const setLevel = (name) => {
    logLevel = levels[name];
  };
  const setName = (name) => {
    logName = name;
  };

  return {
    debug, info, warn, error,
    setLevel, setName
  };
})();

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
