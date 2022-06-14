import express, { Router } from "express";
import { authenticateToken } from "middlewares/authToken";
import { getProjectInspectionsController } from "controllers/projectController";

const initializeRouter = (): Router => {
	const router = express.Router();

	router.get("/inspections", authenticateToken, getProjectInspectionsController);

	return router;
};

export const projectRoutes = initializeRouter();
