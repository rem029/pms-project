import { Response } from "express";
import { logger } from "utilities/logger";
import { ResponseInterface, RequestAuthInterface } from "../types";

export const handleServerResponse = <T>(
	res: Response,
	req: RequestAuthInterface,
	code: number,
	payload: ResponseInterface<T>
): void => {
	const endTime = new Date();
	const startTime = req.startTime ? req.startTime.getTime() : 0;
	logger.info(`URL: ${req.url}:`);
	logger.info(`startTime: ${req.startTime?.toUTCString()}`);
	logger.info(`endTime: ${endTime.toUTCString()}`);
	logger.info(`responseTime(ms): ${endTime.getTime() - startTime}`);
	res.status(code).json(payload);
};

export const handleServerError = <T>(
	res: Response,
	req: RequestAuthInterface,
	code: number,
	payload: ResponseInterface<T>
): void => {
	const endTime = new Date();
	const startTime = req.startTime ? req.startTime.getTime() : 0;
	logger.info(`URL: ${req.url}:`);
	logger.info(`startTime: ${req.startTime?.toUTCString()}`);
	logger.info(`endTime: ${endTime.toUTCString()}`);
	logger.info(`responseTime(ms): ${endTime.getTime() - startTime}`);
	logger.info(`@handleError ${code} payload: ${JSON.stringify(payload)}`);
	res.status(code).json(payload);
};
