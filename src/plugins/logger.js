import { createLogger, StringifyObjectsHook } from 'vue-logger-plugin';

const isProduction = process.env.NODE_ENV === 'production';

const logger = createLogger({
  enabled: true,
  consoleEnabled: true,
  level: isProduction ? 'log' : 'debug',
  beforeHooks: [StringifyObjectsHook]
});

export default logger;
