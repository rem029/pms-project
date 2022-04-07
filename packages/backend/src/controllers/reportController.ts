import { Response } from "express";
import moment from "moment-timezone";
import { knexMySQL } from "services/database";
import { logger } from "utilities/logger";
import { handleServerResponse, handleServerError } from "helpers/serverResponse";
import { REPORT_FILTER } from "utilities/constants";
import {
	ReportFilter,
	ReportFilterItem,
	ReportFilterType,
	ReportProgressDetailInterface,
	RequestAuthInterface,
} from "types";

const formatReportProgressDetailController = (
	response: ReportProgressDetailInterface[]
): ReportProgressDetailInterface[] => {
	let returnArray: ReportProgressDetailInterface[] = [];

	for (const items of response) {
		returnArray = [...returnArray, { ...items, activities: JSON.parse(items.activities.toString()) }];
	}

	return returnArray;
};

const defaultReportFilters: ReportFilterType = {
	date: null,
	phase: null,
	classification: null,
	project: null,
	milestone: null,
	zone: null,
	section: null,
	type: null,
	owner: null,
	building: null,
	showCancelledDocs: false,
};

const getReportFilter = (filters: ReportFilterType): { queryFilter: string; queryBindings: any[] } => {
	const queryFilter = `
				WHERE
					-- date filter
					${filters.date ? "DATE(InsH_Dt) = Date(?)" : "TRUE"}
				AND
					-- phase filter
					${filters.phase ? "pmsysdb.phasem.Phs_Cd = ?" : "TRUE"}
				AND
					-- classification filter
					${filters.classification ? "pmsysdb.classm.Cls_Cd = ?" : "TRUE"}
				AND
					-- project filter
					${filters.project ? "pmsysdb.buildm.Prj_Cd = ?" : "TRUE"}
				AND
					-- milestone filter
					${filters.milestone ? "pmsysdb.buildm.Mst_Cd = ?" : "TRUE"}

				AND
					-- type filter
					${filters.building ? "pmsysdb.buildm.Typ_Cd = ?" : "TRUE"}
				AND
					-- ownerName filter
					${filters.owner ? "pmsysdb.ownm.Own_Cd = ?" : "TRUE"}
				AND
					-- building filter
					${filters.building ? "pmsysdb.buildm.Bld_Cd = ?" : "TRUE"}
				AND
					InsH_Cancelled = ?
	`;

	const queryBindings: any[] = [];

	for (const keys in filters) {
		const keyItem = keys;
		const currentItem = filters[keyItem as keyof ReportFilterType];

		if (currentItem !== null) {
			if (keyItem !== "date" && keyItem !== "showCancelledDocs") {
				queryBindings.push((currentItem as ReportFilter).id);
			} else {
				queryBindings.push(currentItem);
			}
		}
	}

	return {
		queryFilter: queryFilter,
		queryBindings: queryBindings,
	};
};

export const getReportProgressDetailController = async (req: RequestAuthInterface, res: Response): Promise<void> => {
	try {
		logger.info("@reportProgressDetailController");
		const filters = req.query.filter
			? (JSON.parse(req.query.filter as string) as ReportFilterType)
			: defaultReportFilters;
		const { queryFilter, queryBindings } = getReportFilter(filters);

		console.log("@reportProgressDetailController filters", filters);
		console.log("@reportProgressDetailController queryFilter", queryFilter);
		console.log("@reportProgressDetailController queryBindings", queryBindings);

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
				${queryFilter}
				GROUP BY
					InsH_No
				ORDER BY
					InsH_Dt DESC;
			`,
			queryBindings
		);
		// ********TBD ZONE FILTER
		// ********TBD SECTION FILTER

		console.log("@reportProgressDetailController filters", filters);
		console.log("@reportProgressDetailController getReportFilter", getReportFilter(filters));

		const response = formatReportProgressDetailController(results[0] as ReportProgressDetailInterface[]);

		console.log("response", response);

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
