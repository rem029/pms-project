import { Request } from "express";
import { DeliverablesMaster } from "@wakra-project/common";

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
	errorMessage?: string;
}
