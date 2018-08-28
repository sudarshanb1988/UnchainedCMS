import { errorLogger } from 'api/auth';

window.onerror = async (message, filename, lineno, colno, error) => {
  const req = {
    Filename: filename,
    LineNumber: lineno,
    Column: colno,
    Message: message,
    StackTrace: error.stack,
    UserAgent: window.navigator.appVersion
  };
  await errorLogger(req);
  console.log(req); // eslint-disable-line
};
