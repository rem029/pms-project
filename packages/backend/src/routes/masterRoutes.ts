import express, { Router } from "express";
import { authenticateToken } from "middlewares/authToken";
import { addDeliverables } from "controllers/masterController";

const initializeRouter = (): Router => {
	const router = express.Router();

	router.post("/deliverables", authenticateToken, addDeliverables);

	return router;
};

export const masterRoutes = initializeRouter();
