import express, { Router } from "express";
import { authenticateToken } from "middlewares/authToken";
import {
	getReportFilterController,
	getReportProgressDetailController,
	getReportProgressSummaryController,
} from "controllers/reportController";

const initializeRouter = (): Router => {
	const router = express.Router();

	router.get("/progress-detail", authenticateToken, getReportProgressDetailController);
	router.get("/progress-summary", authenticateToken, getReportProgressSummaryController);
	router.get("/filter/:type", authenticateToken, getReportFilterController);

	return router;
};

export const reportRoutes = initializeRouter();
