import express, { Router } from "express";
import { authenticateToken } from "middlewares/authToken";
import { addActivity, addDeliverable, getActivities, getDeliverables } from "controllers/masterController";

const initializeRouter = (): Router => {
	const router = express.Router();

	router.post("/deliverable", authenticateToken, addDeliverable);
	router.get("/deliverables", authenticateToken, getDeliverables);

	router.post("/activity", authenticateToken, addActivity);
	router.get("/activities", authenticateToken, getActivities);

	return router;
};

export const masterRoutes = initializeRouter();
