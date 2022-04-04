import { Response } from "express";
import { knexMySQL } from "services/database";
import { logger } from "utilities/logger";
import { handleServerResponse, handleServerError } from "helpers/serverResponse";
import { REPORT_FILTER } from "utilities/constants";
import { ReportFilterItem, ReportProgressDetailInterface, RequestAuthInterface } from "types";

const formatReportProgressDetailController = (
	response: ReportProgressDetailInterface[]
): ReportProgressDetailInterface[] => {
	let returnArray: ReportProgressDetailInterface[] = [];

	for (const items of response) {
		returnArray = [...returnArray, { ...items, activities: JSON.parse(items.activities.toString()) }];
	}

	return returnArray;
};

export const getReportProgressDetailController = async (req: RequestAuthInterface, res: Response): Promise<void> => {
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

		const response = formatReportProgressDetailController(results[0] as ReportProgressDetailInterface[]);

		handleServerResponse(res, 200, {
			success: true,
			message: "Get report progress detail success",
			data: response,
		});
	} catch (error) {
		logger.error(`@reportProgressDetailController error ${error}`);
		handleServerError(res, 500, {
			success: false,
			message: "Get report progress detail error",
			error: error as Error,
		});
	}
};

export const getReportFilterController = async (req: RequestAuthInterface, res: Response): Promise<void> => {
	try {
		logger.info("@getReportFilterController");

		const { type } = req.params;

		if (!type) throw new Error("<type> parameter is required in url");
		if (!REPORT_FILTER[type]) throw new Error("Filter type not found");

		const { columnName, tableName } = REPORT_FILTER[type];
		const results = await knexMySQL.raw(
			`
			SELECT 					
				${columnName}_Cd as id,
				${columnName}_Name as name
			FROM 
				pmsysdb.${tableName}
			WHERE
				isActive = 1;
			`
		);

		const response = results[0] as ReportFilterItem[];

		handleServerResponse(res, 200, {
			success: true,
			message: "Get filters success",
			data: response,
		});
	} catch (error) {
		logger.error(`@getReportFilterController error ${error}`);
		handleServerError(res, 500, {
			success: false,
			message: "Get filters error",
			error: error as Error,
		});
	}
};
