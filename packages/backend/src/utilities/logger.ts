import winston from "winston";
import fs from "fs";
import { get } from "helpers/now";
import path from "path";
const logDir = "__logs";

if (!fs.existsSync(logDir)) {
	// Create the directory if it does not exist
	fs.mkdirSync(logDir);
}

const colorizer = winston.format.colorize();

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const fileOptions = (
	type: string
): {
	filename: string;
	level: string;
	maxsize: number;
	maxFiles: number;
} => {
	return {
		filename: path.join(`${logDir}/${type}.log`),
		level: type,
		maxsize: 5242880,
		maxFiles: 3,
	};
};

const initializeLogger = (): winston.Logger =>
	winston.createLogger({
		handleExceptions: true,
		format: winston.format.combine(
			winston.format.simple(),
			winston.format.printf((msg) => {
				return colorizer.colorize(msg.level, `${get()}\t${msg.message}`);
			})
		),
		transports: [
			new winston.transports.File(fileOptions("info")),
			new winston.transports.File(fileOptions("error")),
			new winston.transports.Console(),
		],
	});

export const logger = initializeLogger();
