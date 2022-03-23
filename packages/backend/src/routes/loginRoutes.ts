import express, { Router } from "express";
import { loginController } from "controllers/loginController";
import { authenticateLogin } from "middlewares/authUser";

const initializeRouter = (): Router => {
	const router = express.Router();

	router.get("/", authenticateLogin, loginController);

	return router;
};

export const loginRoute = initializeRouter();
