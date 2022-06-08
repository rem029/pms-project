import express, { Router } from "express";
import { authenticateToken } from "middlewares/authToken";
import { addActivity, addDeliverables } from "controllers/masterController";

const initializeRouter = (): Router => {
	const router = express.Router();

	router.post("/deliverables", authenticateToken, addDeliverables);
	router.post("/activity", authenticateToken, addActivity);

	return router;
};

export const masterRoutes = initializeRouter();
