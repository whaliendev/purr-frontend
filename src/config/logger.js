const isProduction = process.env.NODE_ENV === 'production';

const loggerOptions = {
  isEnabled: true,
  logLevel: isProduction ? 'error' : 'debug',
  stringifyArguments: true,
  showLogLevel: true,
  showMethodName: true,
  separator: ' ',
  showConsoleColors: true
};

export default loggerOptions;
