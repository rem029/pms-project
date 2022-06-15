import { Response } from "express";
import { knexMySQL } from "services/database";
import { logger } from "utilities/logger";
import { handleServerResponse, handleServerError } from "helpers/serverResponse";
import { ActivityMaster, DeliverablesMaster } from "@wakra-project/common";
import { RequestWithMetrics } from "types";
import {
	ActivityByClassification,
	ActivityMasterItemInfo,
	DeliverablesMasterInfo,
} from "@wakra-project/common/src/types/report";

export const getDeliverables = async (req: RequestWithMetrics, res: Response): Promise<void> => {
	try {
		logger.info("@getDeliverables");

		const result = await knexMySQL.raw(
			`
				SELECT
					Prj_Cd as projectCode,
					Bld_Cd as buildingCode,
					Bld_Name as buildingName,
					Mst_Cd as milestoneCode,
					Zon_Cd as zoneCode,
					Sec_Cd as sectionCode,
					Typ_Cd as typeCode,
					Own_Cd as ownerCode,
					Cns_Cd as constructionCode,
					unit,
					mode as module,
					IsActive as isActive
				FROM pmsysdb.buildm		
			`,
			[]
		);

		const response = result[0] as DeliverablesMasterInfo[];

		handleServerResponse(res, req, 200, {
			__typename: "DeliverablesMasterInfo",
			success: true,
			message: "Get Deliverables success",
			data: response,
		});
	} catch (error) {
		logger.error(`@getDeliverables Error ${error}`);
		handleServerError(res, req, 500, {
			success: false,
			message: "Deliverable error",
			errorMessage: (error as Error).message,
		});
	}
};

export const getActivities = async (req: RequestWithMetrics, res: Response): Promise<void> => {
	try {
		logger.info("@getActivities");

		const result = await knexMySQL.raw(
			`
				SELECT
					Prj_Cd as projectCode,
					Phs_Cd as phaseCode,
					Cls_Cd as classificationCode,
					Act_Cd as activityCode,
					Act_Name as activityName,
					Act_PosId as activityOrder,
					IsActive as isActive
				FROM pmsysdb.activitym		
			`,
			[]
		);

		const response = result[0] as ActivityMasterItemInfo[];

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
};

export const getActivitiesByClassification = async (req: RequestWithMetrics, res: Response): Promise<void> => {
	try {
		logger.info("@getActivitiesByClassification");
		const classificationCode = "TP";
		const phaseCode = "06C";

		const result = await knexMySQL.raw(
			`
				SELECT
					Act_PosId as activityOrder,					
					Act_Cd as activityCode,
					Act_Name as activityName
				FROM pmsysdb.activitym
				WHERE
					Cls_Cd=?
				AND 
					Phs_Cd=?
			`,
			[classificationCode, phaseCode]
		);

		const response = result[0] as ActivityByClassification[];

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
};

export const addDeliverable = async (req: RequestWithMetrics, res: Response): Promise<void> => {
	try {
		logger.info("@addDeliverable");

		const fields = (
			req.body.addDeliverable ? req.body.addDeliverable : JSON.parse(req.headers["data"] as string)
		) as DeliverablesMaster;

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
			message: "Add Deliverable success",
			data: "Add Deliverable success",
		});
	} catch (error) {
		logger.error(`@addDeliverable Error ${error}`);
		handleServerError(res, req, 500, {
			success: false,
			message: "Deliverable error",
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
