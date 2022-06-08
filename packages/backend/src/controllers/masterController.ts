import { Response } from "express";
import { knexMySQL } from "services/database";
import { logger } from "utilities/logger";
import { handleServerResponse, handleServerError } from "helpers/serverResponse";
import { ActivityMaster, DeliverablesMaster } from "@wakra-project/common";
import { RequestWithMetrics } from "types";

export const addDeliverables = async (req: RequestWithMetrics, res: Response): Promise<void> => {
	try {
		logger.info("@addDeliverables");

		const fields = (
			req.body.addDeliverables ? req.body.addDeliverables : JSON.parse(req.headers["data"] as string)
		) as DeliverablesMaster;

		// : JSON.parse(req.headers["data"] as string);

		console.log("@addDeliverables fields", fields);
		console.log("@addDeliverables fields name", fields.name);

		await knexMySQL.raw(
			`
			INSERT INTO pmsysdb.buildm VALUES
			-- projectCode, code, name, mstCode, zoneCode, secCode, typeCode, ownCode, cnsCode, unit, module, isActive
			(?,?,?,?,?,?,?,?,?,?,?,1);
			`,
			[
				fields.project?.id as unknown as string,
				fields.code,
				fields.name,
				fields.milestone?.id as unknown as string,
				fields.zone?.id as unknown as string,
				fields.section?.id as unknown as string,
				fields.type?.id as unknown as string,
				fields.owner?.id as unknown as string,
				fields.construction?.id as unknown as string,
				fields.units,
				fields.modules,
			]
		);

		handleServerResponse(res, req, 200, {
			__typename: "sample",
			success: true,
			message: "Add Deliverables success",
			data: "Add Deliverables success",
		});
	} catch (error) {
		logger.error(`@addDeliverables Error ${error}`);
		handleServerError(res, req, 500, {
			success: false,
			message: "Deliverables error",
			errorMessage: (error as Error).message,
		});
	}
};

export const addActivity = async (req: RequestWithMetrics, res: Response): Promise<void> => {
	try {
		logger.info("@addActivity");

		const fields = (
			req.body.addActivity ? req.body.addActivity : JSON.parse(req.headers["data"] as string)
		) as ActivityMaster;

		// : JSON.parse(req.headers["data"] as string);

		console.log("@addActivity fields", fields);
		console.log("@addActivity fields name", fields.name);

		await knexMySQL.raw(
			`
			INSERT INTO pmsysdb.activitym VALUES
			(?,?,?,?,?,?,1);
			`,
			[
				fields.project?.id as unknown as string,
				fields.phase?.id as unknown as string,
				fields.classification?.id as unknown as string,
				fields.code,
				fields.name,
				fields.activityOrder,
			]
		);

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
};
