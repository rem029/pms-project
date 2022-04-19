import { Response } from "express";
import { logger } from "utilities/logger";
import { ResponseInterface } from "../types";

export const handleServerResponse = <T>(res: Response, code: number, payload: ResponseInterface<T>): void => {
	res.status(code).json(payload);
};

export const handleServerError = <T>(res: Response, code: number, payload: ResponseInterface<T>): void => {
	logger.info(`@handleError ${code} payload: ${JSON.stringify(payload)}`);
	res.status(code).json(payload);
};
