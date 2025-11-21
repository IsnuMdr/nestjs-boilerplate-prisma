import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';

const USE_JSON_LOGGER = process.env.USE_JSON_LOGGER;
const APP_NAME = process.env.APP_NAME;

let consoleFormat;

if (USE_JSON_LOGGER === 'true') {
  consoleFormat = winston.format.combine(
    winston.format.ms(),
    winston.format.timestamp(),
    winston.format.json(),
  );
} else {
  consoleFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.ms(),
    nestWinstonModuleUtilities.format.nestLike(APP_NAME, {
      colors: true,
      prettyPrint: true,
    }),
  );
}

let transports = [
  new winston.transports.Console({
    format: consoleFormat,
  }),

  new winston.transports.DailyRotateFile({
    filename: 'logs/application-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: consoleFormat,
  }),
];

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports,
});
