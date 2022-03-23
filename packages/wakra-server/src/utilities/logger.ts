import winston from 'winston';
import fs from 'fs';
import { get } from 'helpers/now';
import path from 'path';
const logDir = '__logs';

if (!fs.existsSync(logDir)) {
  // Create the directory if it does not exist
  fs.mkdirSync(logDir);
}

const colorizer = winston.format.colorize();
const fileOptions = (type: string) => {
  return {
    filename: path.join(`${logDir}/${type}.log`),
    level: type,
    maxsize: 5242880,
    maxFiles: 3,
  };
};

const initializeLogger = () =>
  winston.createLogger({
    handleExceptions: true,
    format: winston.format.combine(
      winston.format.simple(),
      winston.format.printf((msg) => {
        let { heapUsed, heapTotal, arrayBuffers, external, rss } = process.memoryUsage();
        heapUsed = Math.floor(heapUsed / 1024 / 1024);
        heapTotal = Math.floor(heapTotal / 1024 / 1024);
        arrayBuffers = Math.floor(arrayBuffers / 1024 / 1024);
        rss = Math.floor(rss / 1024 / 1024);
        external = Math.floor(external / 1024 / 1024);

        return colorizer.colorize(msg.level, `${get()}\t${msg.message}`);
      })
    ),
    transports: [
      new winston.transports.File(fileOptions('info')),
      new winston.transports.File(fileOptions('error')),
      new winston.transports.Console(),
    ],
  });

export const logger = initializeLogger();
