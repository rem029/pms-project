import express, { Router } from "express";
import { authenticateToken } from "middlewares/authToken";
import { addProjectInspectionsController, getProjectInspectionsController } from "controllers/projectController";

const initializeRouter = (): Router => {
	const router = express.Router();

	router.get("/inspections", authenticateToken, getProjectInspectionsController);
	router.post("/inspections/entry", authenticateToken, addProjectInspectionsController);

	return router;
};

export const projectRoutes = initializeRouter();
