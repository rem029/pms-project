import express, { Router, Response } from "express";
import { handleServerResponse, handleServerError } from "helpers/serverResponse";
import { RequestAuthInterface } from "types";
import { logger } from "utilities/logger";
import { getUserInfoController } from "../controllers/userController";
import { authenticateToken } from "../middlewares/authToken";

const initializeRouter = (): Router => {
	const router = express.Router();

	router.get("/", authenticateToken, async (req: RequestAuthInterface, res: Response) => {
		try {
			logger.info("@getUserInfoController");
			const { userId } = req.user ? req.user : { userId: "" };
			const response = await getUserInfoController({ userId });

			handleServerResponse(res, req, 200, {
				__typename: response.__typename,
				success: true,
				message: "Get user info success",
				data: response,
			});
		} catch (error) {
			logger.error(`@getUserInfoController Error ${error}`);

			handleServerError(res, req, 500, {
				success: false,
				message: "Get user info error",
				errorMessage: (error as Error).message,
			});
		}
	});

	return router;
};

export const userRoutes = initializeRouter();
