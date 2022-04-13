import { Response } from "express";
import moment from "moment-timezone";
import { knexMySQL } from "services/database";
import { logger } from "utilities/logger";
import { handleServerResponse, handleServerError } from "helpers/serverResponse";
import { REPORT_FILTER } from "utilities/constants";
import {
	RequestAuthInterface,
	ReportFilter,
	ReportFilterItem,
	ReportFilterType,
	ReportProgressDetailInterface,
	ReportProgressSummaryInterface,
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
					${filters.type ? "pmsysdb.buildm.Typ_Cd = ?" : "TRUE"}
				AND
					-- ownerName filter
					${filters.owner ? "pmsysdb.ownm.Own_Cd = ?" : "TRUE"}
				AND
					-- building filter
					${filters.building ? "pmsysdb.buildm.Bld_Cd = ?" : "TRUE"}
				AND
					InsH_Cancelled = ?
	`;

	// ********TBD ZONE FILTER
	// ********TBD SECTION FILTER

	const queryBindings: any[] = [];

	for (const keys in filters) {
		const keyItem = keys as keyof ReportFilterType;
		const currentItem = filters[keyItem];

		if (currentItem !== null && keyItem !== "zone" && keyItem !== "section") {
			if (keyItem !== "date" && keyItem !== "showCancelledDocs") {
				queryBindings.push((currentItem as ReportFilter).id);
			} else {
				queryBindings.push(currentItem);
			}
		}
	}

	console.log("queryFilter, queryBindings", {
		queryFilter: queryFilter,
		queryBindings: queryBindings,
	});

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
					pmsysdb.buildm.Unit as unit,
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

export const getReportProgressSummaryController = async (req: RequestAuthInterface, res: Response): Promise<void> => {
	try {
		logger.info("@getReportProgressSummaryController");
		const filters = req.query.filter
			? (JSON.parse(req.query.filter as string) as ReportFilterType)
			: defaultReportFilters;
		const { queryFilter, queryBindings } = getReportFilter(filters);

		console.log("@getReportProgressSummaryController filters", filters);
		console.log("@getReportProgressSummaryController queryFilter", queryFilter);
		console.log("@getReportProgressSummaryController queryBindings", queryBindings);

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
				pmsysdb.buildm.Unit as unit,
				pmsysdb.buildm.Mode as module,
				InsH_Cancelled as isCancelled,
				MAX(CASE WHEN InsD_Code = 'FND' THEN InsD_Prg END) as activityFoundation,
				MAX(CASE WHEN InsD_Code = 'SUP' THEN InsD_Prg END) as activitySuperStructure,
				MAX(CASE WHEN InsD_Code = 'PRT' THEN InsD_Prg END) as activityPartitionBlockWorkPlaster,
				MAX(CASE WHEN InsD_Code = 'ELE1' THEN InsD_Prg END) as activityElectricalFirstFix,
				MAX(CASE WHEN InsD_Code = 'MCH1' THEN InsD_Prg END) as activityMechanicalFirstFix,
				MAX(CASE WHEN InsD_Code = 'WTP' THEN InsD_Prg END) as activityWetAreaProofing,
				MAX(CASE WHEN InsD_Code = 'SRD' THEN InsD_Prg END) as activityScreed,
				MAX(CASE WHEN InsD_Code = 'TIL' THEN InsD_Prg END) as activityFlooringTerrazzoEpoxy,
				MAX(CASE WHEN InsD_Code = 'WAL' THEN InsD_Prg END) as activityWallCladding,
				MAX(CASE WHEN InsD_Code = 'ELE2' THEN InsD_Prg END) as activityElectricalSecondFix,
				MAX(CASE WHEN InsD_Code = 'MCH2' THEN InsD_Prg END) as activityMechanicalSecondFix,
				MAX(CASE WHEN InsD_Code = 'RWP' THEN InsD_Prg END) as activityRoofWaterProofing,
				MAX(CASE WHEN InsD_Code = 'EPN' THEN InsD_Prg END) as activityExternalPaint,
				MAX(CASE WHEN InsD_Code = 'IPN' THEN InsD_Prg END) as activityInternalPaint,
				MAX(CASE WHEN InsD_Code = 'WND' THEN InsD_Prg END) as activityWindows,
				MAX(CASE WHEN InsD_Code = 'DR' THEN InsD_Prg END) as activityDoors,
				MAX(CASE WHEN InsD_Code = 'HNDR' THEN InsD_Prg END) as activityHandlRails,
				MAX(CASE WHEN InsD_Code = 'MCHF' THEN InsD_Prg END) as activityMechanical,
				MAX(CASE WHEN InsD_Code = 'ELEF' THEN InsD_Prg END) as activityElectrical,
				MAX(CASE WHEN InsD_Code = 'KTC' THEN InsD_Prg END) as activityKitchen,
				MAX(CASE WHEN InsD_Code = 'OTH' THEN InsD_Prg END) as activityOthers
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
				pmsysdb.consysm
			ON  
				pmsysdb.consysm.Cns_Cd = pmsysdb.buildm.Cns_Cd
				LEFT JOIN
				pmsysdb.phasem
			ON  
				pmsysdb.phasem.Phs_Cd = pmsysdb.insentryh.Phs_Cd
			LEFT JOIN
				pmsysdb.classm
			ON  
				pmsysdb.classm.Cls_Cd = pmsysdb.insentryh.Cls_Cd
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

		console.log("@getReportProgressSummaryController filters", filters);
		console.log("@getReportProgressSummaryController getReportFilter", getReportFilter(filters));

		const response = results[0] as ReportProgressSummaryInterface[];

		console.log("response", response);

		handleServerResponse(res, 200, {
			success: true,
			message: "Get report progress summary success",
			data: response,
		});
	} catch (error) {
		logger.error(`@getReportProgressSummaryController error ${error}`);
		handleServerError(res, 500, {
			success: false,
			message: "Get report progress summary error",
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
