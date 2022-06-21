import { Router, Response } from "express";
import { loginController } from "controllers/loginController";
import { authenticateLogin } from "middlewares/authUser";
import { RequestAuthInterface } from "types";
import { handleServerResponse, handleServerError } from "helpers/serverResponse";

const initializeRouter = (): Router => {
	const router = Router();

	router.post("/", authenticateLogin, async (req: RequestAuthInterface, res: Response) => {
		const body = req.user ? req.user : { userId: "", password: "" };

		try {
			const returnToken = await loginController(body);

			handleServerResponse(res, req, 200, {
				__typename: returnToken.__typename,
				success: true,
				message: "Login success",
				data: returnToken,
			});
		} catch (error) {
			handleServerError(res, req, 500, {
				success: false,
				message: "Login error",
				errorMessage: (error as Error).message,
			});
		}
	});

	return router;
};

export const loginRoute = initializeRouter();
