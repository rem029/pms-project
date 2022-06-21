import { Response } from "express";
import { knexMySQL } from "services/database";
import { logger } from "utilities/logger";
import { handleServerResponse, handleServerError } from "helpers/serverResponse";

import { RequestAuthInterface } from "types";
import { Inspection, InspectionEntry } from "@wakra-project/common";

export const getProjectInspectionsController = async (req: RequestAuthInterface, res: Response): Promise<void> => {
	try {
		logger.info("@getProjectInspectionsController");

		const results = await knexMySQL.raw(
			`
            SELECT
				InsH_No as inspectionNumber,
				date(InsH_Dt) as inspectionDate,
				date(InsH_Edt) as documentDate,
				Prj_Cd as project,
				Phs_Cd as phase,
				InsH_Bld as building,
				InsH_Own as owner,
				InsH_Remarks as remarks
			FROM
				pmsysdb.insentryh
			WHERE
				InsH_Cancelled = 0;
			`,
			[]
		);

		const response = results[0] as Inspection[];

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
};

export const addProjectInspectionsController = async (req: RequestAuthInterface, res: Response): Promise<void> => {
	try {
		logger.info("@addProjectInspectionsController");
		logger.info(`@addProjectInspectionsController req.user ${req.user}`);
		const fields = (
			req.body.addInspectionEntry ? req.body.addInspectionEntry : JSON.parse(req.headers["data"] as string)
		) as InspectionEntry;
		const phaseCode = "06C";

		/**
		 * to insentryh
		 */
		await knexMySQL.raw(
			`
				INSERT INTO
					pmsysdb.insentryh (
					InsH_No,
					InsH_Dt,
					InsH_Edt,
					Prj_Cd,
					Phs_Cd,
					Cls_Cd,
					InsH_Bld,
					InsH_Own,
					InsH_Remarks,
					InsH_Cancelled
				)
				VALUES
					(?, ?, ?, ?, ?, ?, ?, ?, ?, 0);
			`,
			[
				fields.inspectNo as unknown as string,
				fields.inspectionDate,
				fields.documentDate,
				fields.project?.id as unknown as string,
				phaseCode,
				fields.classification?.id as unknown as string,
				fields.deliverable?.id as unknown as string,
				fields.owner?.id as unknown as string,
				fields.remarks as string,
			]
		);

		/**
		 * to insentryd
		 */

		for (const activity of fields.activities ? fields.activities : []) {
			logger.info(`@addProjectInspectionsController insert ${fields.inspectNo} for ${activity.activityName}`);
			await knexMySQL.raw(
				`
					INSERT INTO
						pmsysdb.insentryd (
						InsD_No,
						InsD_Dt,
						InsD_Edt,
						Prj_Cd,
						Phs_Cd,
						Cls_Cd,
						InsD_Bld,
						InsD_Own,
						InsD_Id, 
						InsD_Code, 
						InsD_Name, 
						InsD_Prg, 
						InsD_Com
					)
					VALUES
						(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
				`,
				[
					fields.inspectNo as unknown as string,
					fields.inspectionDate,
					fields.documentDate,
					fields.project?.id as unknown as string,
					phaseCode,
					fields.classification?.id as unknown as string,
					fields.deliverable?.id as unknown as string,
					fields.owner?.id as unknown as string,
					activity.activityOrder,
					activity.activityCode,
					activity.activityName,
					(activity.progress ? activity.progress : 0) as unknown as number,
					(activity.comments ? activity.comments : "") as unknown as string,
				]
			);
		}

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
};
