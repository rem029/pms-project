import { Response } from "express";
import { knexMySQL } from "services/database";
import { logger } from "utilities/logger";
import { handleServerResponse, handleServerError } from "helpers/serverResponse";

import { RequestAuthInterface } from "types";
import { Inspection } from "@wakra-project/common";

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
