import { Response } from "express";
import { logger } from "utilities/logger";
import { ResponseInterface } from "../types";

export const handleResponse = <T>(
	res: Response,
	code: number,
	payload: ResponseInterface<T>
): void => {
	logger.info(`@handledResponse ${code} payload: ${JSON.stringify(payload)}`);
	res.status(code).json(payload);
};

export const handleError = <T>(
	res: Response,
	code: number,
	payload: ResponseInterface<T>
): void => {
	logger.info(`@handleError ${code} payload: ${JSON.stringify(payload)}`);
	res.status(code).json(payload);
};
