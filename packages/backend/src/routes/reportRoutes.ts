import express, { Router } from "express";
import { authenticateToken } from "middlewares/authToken";
import { getReportFilterController, getReportProgressDetailController } from "controllers/reportController";

const initializeRouter = (): Router => {
	const router = express.Router();

	router.get("/progressive-detail", authenticateToken, getReportProgressDetailController);
	router.get("/filter/:type", authenticateToken, getReportFilterController);

	return router;
};

export const reportRoutes = initializeRouter();
