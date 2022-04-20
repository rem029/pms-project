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
	logger.info(`Route: ${req.url}`);
	logger.info(`Start time: ${req.startTime}`);
	logger.info(`End Time: ${endTime}`);
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
	logger.error(`Route: ${req.url}`);
	logger.error(`Start time: ${req.startTime}`);
	logger.error(`End Time: ${endTime}`);
	logger.error(`responseTime(ms): ${endTime.getTime() - startTime}`);
	logger.error(`@handleError ${code} payload: ${JSON.stringify(payload)}`);
	res.status(code).json(payload);
};
