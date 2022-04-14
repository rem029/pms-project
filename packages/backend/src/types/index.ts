import { Request } from "express";

export interface RequestAuthInterface extends Request {
	user?: { userId: string; password?: string };
}

export interface ResponseInterface<T> {
	success: boolean;
	message: string;
	data?: T;
	error?: Error;
}
