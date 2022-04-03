import express, { Router } from "express";
import { getReportProgressDetailController } from "../controllers/reportController";
import { authenticateToken } from "../middlewares/authToken";

const initializeRouter = (): Router => {
	const router = express.Router();

	router.get("/progressive-detail", authenticateToken, getReportProgressDetailController);
	return router;
};

export const reportRoutes = initializeRouter();
