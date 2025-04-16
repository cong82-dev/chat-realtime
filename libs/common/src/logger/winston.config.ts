import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import * as path from 'path';

const logDir = path.join(process.cwd(), 'logs');

const createFileTransport = (level: string) => winston.format((info) => (info.level === level ? info : false))();

export const winstonConfig = {
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike('Chat-realtime', {
          prettyPrint: true,
        }),
      ),
    }),
    new DailyRotateFile({
      dirname: `${logDir}/info`,
      filename: `%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxFiles: '14d',
      level: 'info',
      format: winston.format.combine(createFileTransport('info'), winston.format.timestamp(), winston.format.json()),
    }),
    new DailyRotateFile({
      dirname: `${logDir}/error`,
      filename: `%DATE%.error.log`,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxFiles: '30d',
      level: 'error',
      format: winston.format.combine(createFileTransport('error'), winston.format.timestamp(), winston.format.json()),
    }),
    new DailyRotateFile({
      dirname: `${logDir}/warn`,
      filename: `%DATE%.warn.log`,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxFiles: '30d',
      level: 'warn',
      format: winston.format.combine(createFileTransport('warn'), winston.format.timestamp(), winston.format.json()),
    }),
  ],
};
