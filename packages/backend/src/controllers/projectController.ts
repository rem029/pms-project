import { Response } from "express";
import { knexMySQL } from "services/database";
import { logger } from "utilities/logger";
import { handleServerResponse, handleServerError } from "helpers/serverResponse";

import { RequestAuthInterface } from "types";
import { Inspection, InspectionEntry } from "@wakra-project/common";

export const getProjectInspectionsController = async (): Promise<Inspection[]> => {
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
	return response;
};

export const addProjectInspectionsController = async (fields: InspectionEntry): Promise<boolean> => {
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

	return true;
};
