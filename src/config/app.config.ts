import { LogLevel } from '@nestjs/common';
import { registerAs } from '@nestjs/config';
import * as path from 'path';

function parseLogLevel(level: string | undefined): LogLevel[] {
  if (!level) {
    return ['log', 'error', 'warn', 'debug', 'verbose'];
  }

  if (level === 'none') {
    return [];
  }

  return level.split(',') as LogLevel[];
}

export default registerAs('app', () => ({
  port: parseInt(process.env.APP_PORT) || 3000,
  baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  loggerLevel: parseLogLevel(
    process.env.APP_LOGGER_LEVEL || 'log,error,warn,debug,verbose',
  ),
  env: process.env.NODE_ENV || 'dev',
  debug: process.env.DEBUG || false,
  // eslint-disable-next-line global-require,@typescript-eslint/no-var-requires
  version: require(path.join(process.cwd(), 'package.json')).version,
}));