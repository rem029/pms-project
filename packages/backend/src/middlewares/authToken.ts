import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { logger } from "utilities/logger";
import { UserInfo, Token } from "@wakra-project/common";
import { RequestAuthInterface } from "types";
import { handleServerError } from "helpers/serverResponse";

export const generateAccessToken = (payload: object, expiresIn = "24h"): Token => {
	console.log("@generateAccessToken", payload);
	return {
		token: jwt.sign(payload, process.env.API_TOKEN_SECRET as jwt.Secret, {
			expiresIn: expiresIn,
		}),
		expiresIn,
	};
};

export const generateRefreshToken = (payload: object, expiresIn = "1y"): Token => {
	return {
		token: jwt.sign(payload, process.env.API_TOKEN_REFRESH as jwt.Secret, {
			expiresIn: expiresIn,
		}),
		expiresIn,
	};
};

export const decodeToken = (token: string): string | jwt.JwtPayload =>
	jwt.verify(token, process.env.API_TOKEN_SECRET as jwt.Secret);

export const authenticateToken = (req: RequestAuthInterface, res: Response, next: NextFunction): void => {
	logger.info("@middleware authenticateToken");
	const tokenFromHeader = req.headers["authorization"];
	const token = tokenFromHeader && tokenFromHeader.split(" ")[1];

	if (!token) {
		handleServerError(res, req, 403, {
			success: false,
			message: "A token is required for authentication",
		});
		return;
	}

	try {
		const decodedUser = decodeToken(token) as UserInfo;
		logger.info(`@middleware authenticateToken decoded userId: ${decodedUser.Usr_Id}`);
		req.user = { userId: decodedUser.Usr_Id };
	} catch (error) {
		logger.error(`@middleware authenticateToken error: ${JSON.stringify(error)}`);
		return handleServerError(res, req, 401, {
			success: false,
			message: "Token has expired or invalid.",
		});
	}
	next();
};
