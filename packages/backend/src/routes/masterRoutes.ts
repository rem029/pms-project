import express, { Router, Response } from "express";
import { authenticateToken } from "middlewares/authToken";
import {
	addActivity,
	addDeliverable,
	getActivities,
	getActivitiesByClassification,
	getDeliverables,
} from "controllers/masterController";
import { ActivityMaster, DeliverablesMaster } from "@wakra-project/common";
import { handleServerResponse, handleServerError } from "helpers/serverResponse";
import { RequestWithMetrics } from "types";
import { logger } from "utilities/logger";

const initializeRouter = (): Router => {
	const router = express.Router();

	router.post("/deliverable", authenticateToken, async (req: RequestWithMetrics, res: Response) => {
		try {
			logger.info("@addDeliverable");

			const fields = (
				req.body.addDeliverable ? req.body.addDeliverable : JSON.parse(req.headers["data"] as string)
			) as DeliverablesMaster;

			await addDeliverable(fields);

			handleServerResponse(res, req, 200, {
				__typename: "sample",
				success: true,
				message: "Add Deliverable success",
				data: "Add Deliverable success",
			});
		} catch (error) {
			logger.error("@addDeliverable.Error");
			handleServerError(res, req, 500, {
				success: false,
				message: "Deliverable error",
				errorMessage: (error as Error).message,
			});
		}
	});

	router.get("/deliverables", authenticateToken, async (req: RequestWithMetrics, res: Response) => {
		try {
			logger.info("@getDeliverables");
			const result = await getDeliverables();

			handleServerResponse(res, req, 200, {
				__typename: "DeliverablesMasterInfo",
				success: true,
				message: "Get Deliverables success",
				data: result,
			});
		} catch (error) {
			logger.error("@getDeliverables.Error");
			handleServerError(res, req, 500, {
				success: false,
				message: "Deliverable error",
				errorMessage: (error as Error).message,
			});
		}
	});

	router.post("/activity", authenticateToken, async (req: RequestWithMetrics, res: Response) => {
		try {
			logger.info("@addActivity");
			const fields = (
				req.body.addActivity ? req.body.addActivity : JSON.parse(req.headers["data"] as string)
			) as ActivityMaster;

			await addActivity(fields);

			handleServerResponse(res, req, 200, {
				__typename: "sample",
				success: true,
				message: "Add Activity success",
				data: "Add Activity success",
			});
		} catch (error) {
			logger.error(`@addActivity Error ${error}`);
			handleServerError(res, req, 500, {
				success: false,
				message: "Activities error",
				errorMessage: (error as Error).message,
			});
		}
	});

	router.get("/activities", authenticateToken, async (req: RequestWithMetrics, res: Response) => {
		try {
			logger.info("@getActivities");
			const response = await getActivities();

			handleServerResponse(res, req, 200, {
				__typename: "ActivityMasterItemInfo",
				success: true,
				message: "Get activities success",
				data: response,
			});
		} catch (error) {
			logger.error(`@getActivities Error ${error}`);
			handleServerError(res, req, 500, {
				success: false,
				message: "Activities error",
				errorMessage: (error as Error).message,
			});
		}
	});

	router.get("/activities-by-classification", authenticateToken, async (req: RequestWithMetrics, res: Response) => {
		try {
			logger.info("@getActivitiesByClassification");
			const response = await getActivitiesByClassification();

			handleServerResponse(res, req, 200, {
				__typename: "ActivityByClassification",
				success: true,
				message: "Get activities by classification success",
				data: response,
			});
		} catch (error) {
			logger.error(`@getActivitiesByClassification Error ${error}`);
			handleServerError(res, req, 500, {
				success: false,
				message: "Get activities by classification error",
				errorMessage: (error as Error).message,
			});
		}
	});

	return router;
};

export const masterRoutes = initializeRouter();
