import { Router, Response } from "express";
import { loginController } from "controllers/loginController";
import { authenticateLogin } from "middlewares/authUser";
import { RequestAuthInterface } from "types";
import { handleServerResponse, handleServerError } from "helpers/serverResponse";
import { logger } from "utilities/logger";

const initializeRouter = (): Router => {
	const router = Router();

	router.post("/", authenticateLogin, (req: RequestAuthInterface, res: Response) => {
		logger.info("@loginController");
		const body = req.user ? req.user : { userId: "", password: "" };

		loginController(body)
			.then((response) => {
				handleServerResponse(res, req, 200, {
					__typename: response.__typename,
					success: true,
					message: "Login success",
					data: response,
				});
			})
			.catch((error) => {
				logger.error(`@loginController.Error ${error}`);
				handleServerError(res, req, 500, {
					success: false,
					message: "Login error",
					errorMessage: (error as Error).message,
				});
			});
	});

	return router;
};

export const loginRoute = initializeRouter();
