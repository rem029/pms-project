import express, { Router } from "express";
import { reportProgressDetailController } from "../controllers/reportController";
import { authenticateToken } from "../middlewares/authToken";

const initializeRouter = (): Router => {
	const router = express.Router();

	// router.get("/progressive-detail", authenticateToken, reportProgressDetailController);
	router.get("/progressive-detail", reportProgressDetailController);

	return router;
};

export const reportRoutes = initializeRouter();
