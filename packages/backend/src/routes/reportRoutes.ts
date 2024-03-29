import express, { Router, Response } from "express";
import { authenticateToken } from "middlewares/authToken";
import {
	getReportFilterController,
	getReportProgressDetailController,
	getReportProgressSummaryController,
} from "controllers/reportController";
import { RequestAuthInterface } from "types";
import { handleServerResponse, handleServerError } from "helpers/serverResponse";
import { logger } from "utilities/logger";
import {
	ReportFilters,
	ReportProgressSummaryConstruction,
	ReportProgressSummaryTestingCommissioning,
} from "@pms-project/common";

const initializeRouter = (): Router => {
	const router = express.Router();

	router.get("/progress-detail", authenticateToken, async (req: RequestAuthInterface, res: Response) => {
		logger.info("@reportProgressDetailController");
		const filters = req.query.filter ? (JSON.parse(req.query.filter as string) as ReportFilters) : undefined;

		getReportProgressDetailController(filters)
			.then((response) => {
				handleServerResponse(res, req, 200, {
					__typename: response.length > 0 ? response[0].__typename : "",
					success: true,
					message: "Get report progress detail success",
					data: response,
				});
			})
			.catch((error) => {
				logger.error(`@reportProgressDetailController.Error ${error}`);
				handleServerError(res, req, 500, {
					success: false,
					message: "Get report progress detail error",
					errorMessage: (error as Error).message,
				});
			});
	});

	router.get("/progress-summary", authenticateToken, async (req: RequestAuthInterface, res: Response) => {
		logger.info("@getReportProgressDetailController");
		const filters = req.query.filter ? (JSON.parse(req.query.filter as string) as ReportFilters) : undefined;

		getReportProgressSummaryController(filters)
			.then((response) => {
				const success = true;
				const message = "Get report progress summary success";
				let data: ReportProgressSummaryConstruction[] | ReportProgressSummaryTestingCommissioning[] = [];

				if (filters?.phase?.id === "06C") {
					data = response as unknown as ReportProgressSummaryConstruction[];
					handleServerResponse(res, req, 200, {
						__typename: data?.length > 0 ? data[0].__typename : "",
						success: success,
						message: message,
						data: data ? data : [],
					});
					return;
				}

				if (filters?.phase?.id === "07T") {
					data = response as unknown as ReportProgressSummaryTestingCommissioning[];
					handleServerResponse(res, req, 200, {
						__typename: data?.length > 0 ? data[0].__typename : "",
						success: success,
						message: message,
						data: data ? data : [],
					});
					return;
				}

				throw new Error("Unknown phase id");
			})
			.catch((error) => {
				logger.error(`@getReportProgressSummaryController.Error ${error}`);
				handleServerError(res, req, 500, {
					success: false,
					message: "Get report progress summary error",
					errorMessage: (error as Error).message,
				});
			});
	});

	router.get("/filter/:type", authenticateToken, (req: RequestAuthInterface, res: Response) => {
		logger.info("@getReportFilterController");
		const { type } = req.params;

		getReportFilterController(type)
			.then((response) => {
				handleServerResponse(res, req, 200, {
					__typename: "[ReportFilter]",
					success: true,
					message: "Get filters success",
					data: response,
				});
			})
			.catch((error) => {
				logger.error(`@getReportFilterController.Error ${error}`);
				handleServerError(res, req, 500, {
					success: false,
					message: "Get filters error",
					errorMessage: (error as Error).message,
				});
			});
	});

	return router;
};

export const reportRoutes = initializeRouter();
