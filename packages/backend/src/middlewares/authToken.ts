import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { logger } from "utilities/logger";
import { RequestAuthInterface, UserInfo } from "types";
import { handleError } from "helpers/serverResponse";

export interface TokenInterface {
	token: string;
	expiresIn: string;
}

export const generateAccessToken = (
	payload: object,
	expiresIn = "24h"
): TokenInterface => {
	console.log("@generateAccessToken", payload);
	return {
		token: jwt.sign(payload, process.env.API_TOKEN_SECRET as jwt.Secret, {
			expiresIn: expiresIn,
		}),
		expiresIn,
	};
};

export const generateRefreshToken = (
	payload: object,
	expiresIn = "1y"
): TokenInterface => {
	return {
		token: jwt.sign(payload, process.env.API_TOKEN_REFRESH as jwt.Secret, {
			expiresIn: expiresIn,
		}),
		expiresIn,
	};
};

export const decodeToken = (token: string): string | jwt.JwtPayload =>
	jwt.verify(token, process.env.API_TOKEN_SECRET as jwt.Secret);

export const authenticateToken = (
	req: RequestAuthInterface,
	res: Response,
	next: NextFunction
): void => {
	logger.info("@middleware authenticateToken");
	const tokenFromHeader = req.headers["authorization"];
	const token = tokenFromHeader && tokenFromHeader.split(" ")[1];

	if (!token)
		return handleError(res, 403, {
			success: false,
			message: "A token is required for authentication",
		});

	try {
		const decodedUser = decodeToken(token) as UserInfo;
		logger.info(`@middleware authenticateToken decoded userId: ${decodedUser.Usr_Id}`);
		req.user = { userId: decodedUser.Usr_Id };
	} catch (error) {
		logger.error(`@middleware authenticateToken error: ${JSON.stringify(error)}`);
		return handleError(res, 401, {
			success: false,
			message: "Token has expired or invalid.",
		});
	}
	next();
};
