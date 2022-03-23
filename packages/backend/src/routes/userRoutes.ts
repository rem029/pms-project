import express, { Router } from "express";
import { getUserInfoController } from "../controllers/userController";
import { authenticateToken } from "../middlewares/authToken";

const initializeRouter = (): Router => {
	const router = express.Router();

	router.get("/", authenticateToken, getUserInfoController);

	return router;
};

export const userRoutes = initializeRouter();
