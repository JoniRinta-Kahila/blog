import IsLocalhost from "./isLocalhost";

const debug = IsLocalhost();

const dev =  {
  log: (...data: any[]) => debug ? console.log(...data) : null,
  info: (...data: any[]) => debug ? console.info(...data) : null,
  warn: (...data: any[]) => debug ? console.warn(...data) : null,
  error: (...data: any[]) => debug ? console.error(...data) : null,
};

export default dev;
