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
    return `${logName} ${message}`;
  };
  const logMsg = (message, data) => {
    const formatted = format(message)
    if (data)
      console.log(formatted, data);
    else
      console.log(formatted);
    return formatted;
  };
  const debug = (message, data) => {
    if (logLevel >= levels.debug)
      return logMsg(message, data);
    return '';
  };
  const info = (message, data) => {
    if (logLevel >= levels.info)
      return logMsg(message, data);
    return '';
  };
  const warn = (message, data) => {
    if (logLevel >= levels.warn)
      return logMsg(message, data);
    return '';
  };
  const error = (message, data) => {
    return logMsg(message, data);
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
