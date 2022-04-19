import { Request } from "express";

export interface RequestWithMetrics extends Request {
	startTime?: Date;
	endTime?: Date;
}
export interface RequestAuthInterface extends RequestWithMetrics {
	user?: { userId: string; password?: string };
}

export interface ResponseInterface<T> {
	success: boolean;
	message: string;
	__typename?: string;
	data?: T;
	error?: Error;
}
