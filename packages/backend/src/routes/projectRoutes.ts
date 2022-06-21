import express, { Router, Response } from "express";
import { authenticateToken } from "middlewares/authToken";
import { addProjectInspectionsController, getProjectInspectionsController } from "controllers/projectController";
import { handleServerResponse, handleServerError } from "helpers/serverResponse";
import { RequestAuthInterface } from "types";
import { logger } from "utilities/logger";
import { InspectionEntry } from "@wakra-project/common";

const initializeRouter = (): Router => {
	const router = express.Router();

	router.get("/inspections", authenticateToken, async (req: RequestAuthInterface, res: Response): Promise<void> => {
		try {
			logger.info("@getProjectInspectionsController");
			const response = await getProjectInspectionsController();

			handleServerResponse(res, req, 200, {
				__typename: "Inspection",
				success: true,
				message: "Get report progress detail success",
				data: response,
			});
		} catch (error) {
			logger.error(`@getProjectInspectionsController error ${error}`);
			handleServerError(res, req, 500, {
				success: false,
				message: "Get report progress detail error",
				errorMessage: (error as Error).message,
			});
		}
	});

	router.post(
		"/inspections/entry",
		authenticateToken,
		async (req: RequestAuthInterface, res: Response): Promise<void> => {
			try {
				logger.info("@addProjectInspectionsController");
				logger.info(`@addProjectInspectionsController req.user ${req.user}`);

				const fields = (
					req.body.addInspectionEntry ? req.body.addInspectionEntry : JSON.parse(req.headers["data"] as string)
				) as InspectionEntry;

				await addProjectInspectionsController(fields);

				handleServerResponse(res, req, 200, {
					__typename: "string",
					success: true,
					message: "Add inspection entry success",
					data: "Add inspection entry success",
				});
			} catch (error) {
				logger.error(`@addProjectInspectionsController Error ${error}`);
				handleServerError(res, req, 500, {
					success: false,
					message: "Add inspection entry error",
					errorMessage: (error as Error).message,
				});
			}
		}
	);

	return router;
};

export const projectRoutes = initializeRouter();
