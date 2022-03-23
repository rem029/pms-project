import { Response } from "express";
import { ResponseInterface } from "../types";

export const handleResponse = <T>(
	res: Response,
	code: number,
	payload: ResponseInterface<T>
): void => {
	res.status(code).json(payload);
};

export const handleError = <T>(
	res: Response,
	code: number,
	payload: ResponseInterface<T>
): void => {
	res.status(code).json(payload);
};
