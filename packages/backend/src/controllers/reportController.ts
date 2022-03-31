import { Response } from "express";
import { groupBy } from "lodash";
import { knexMySQL } from "services/database";
import { logger } from "utilities/logger";
import { handleServerResponse, handleServerError } from "helpers/serverResponse";
import { ReportProgressDetailInterface, RequestAuthInterface } from "types";
import { DUMMY_PROGRESSIVE_DETAIL } from "../dummy/progressiveDetail";

const formatReportProgressDetailController = (
	response: ReportProgressDetailInterface[]
): ReportProgressDetailInterface[] => {
	let returnArray: ReportProgressDetailInterface[] = [];

	for (const items of response) {
		returnArray = [
			...returnArray,
			{ ...items, activities: JSON.parse(items.activities.toString()) },
		];
	}

	return returnArray;
};

export const reportProgressDetailController = async (
	req: RequestAuthInterface,
	res: Response
): Promise<void> => {
	try {
		// const { userId, password } = req.user ? req.user : { userId: "", password: "" };

		logger.info("@reportProgressDetailController");

		const results = await knexMySQL.raw(
			`
				SELECT 
					InsH_No as inspectionNumber,
					InsH_Dt as inspectionDate,
					InsH_Bld as bldgCode,
					pmsysdb.ownm.Own_Name as ownerName,
					pmsysdb.buildm.Typ_Cd as typeCode,
					pmsysdb.consysm.Cns_Name as constructionMethodName,
					pmsysdb.buildm.Prj_Cd as projectCode,
					pmsysdb.buildm.Mst_Cd as milestoneCode,
					pmsysdb.buildm.Unit,
					pmsysdb.buildm.Mode as module,
					pmsysdb.phasem.Phs_Name as phaseName,
					pmsysdb.classm.Cls_Cd as classificationName,
					InsH_Cancelled as isCancelled,
					JSON_ARRAYAGG(
						JSON_OBJECT(
							'id',InsD_Id,
							'code',InsD_Code,
							'name',InsD_Name,
							'progress',InsD_Prg,
							'comments',InsD_Com
						)
					) as activities    
				FROM 
					pmsysdb.insentryh
				LEFT JOIN
					pmsysdb.insentryd
				ON  
					pmsysdb.insentryd.InsD_No = pmsysdb.insentryh.InsH_No
				LEFT JOIN
					pmsysdb.buildm
				ON  
					pmsysdb.buildm.Bld_Cd = pmsysdb.insentryh.InsH_Bld
				LEFT JOIN
					pmsysdb.ownm
				ON  
					pmsysdb.ownm.Own_Cd = pmsysdb.insentryh.InsH_Own
				LEFT JOIN
					pmsysdb.phasem
				ON  
					pmsysdb.phasem.Phs_Cd = pmsysdb.insentryh.Phs_Cd
				LEFT JOIN
					pmsysdb.classm
				ON  
					pmsysdb.classm.Cls_Cd = pmsysdb.insentryh.Cls_Cd
				LEFT JOIN
					pmsysdb.consysm
				ON  
					pmsysdb.consysm.Cns_Cd = pmsysdb.buildm.Cns_Cd    
				GROUP BY
					InsH_No;
			`
		);

		const response = formatReportProgressDetailController(
			results[0] as ReportProgressDetailInterface[]
		);

		handleServerResponse(res, 200, {
			success: true,
			message: "Generate Report Progress Detail Success",
			data: response,
		});
	} catch (error) {
		logger.error(`@reportProgressDetailController Error ${error}`);
		handleServerError(res, 500, {
			success: false,
			message: "Generate Report Progress Detail Error",
			error: error as Error,
		});
	}
};
