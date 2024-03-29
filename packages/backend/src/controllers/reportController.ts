import { knexMySQL } from "services/database";
import { logger } from "utilities/logger";
import { REPORT_FILTER } from "utilities/constants";
import {
	ReportFilter,
	ReportFilters,
	ReportProgressDetail,
	ReportProgressSummaryConstruction,
	ReportProgressSummaryTestingCommissioning,
} from "@pms-project/common";

const formatReportProgressDetailController = (response: ReportProgressDetail[]): ReportProgressDetail[] => {
	let returnArray: ReportProgressDetail[] = [];

	for (const items of response) {
		returnArray = [...returnArray, { ...items, activities: JSON.parse(items.activities.toString()) }];
	}

	return returnArray;
};

const defaultReportFilters: ReportFilters = {
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
	__typename: "ReportFilters",
};

const getReportFilter = (filters: ReportFilters): { queryFilter: string; queryBindings: any[] } => {
	const queryFilter = `
				WHERE ${filters.date ? "DATE(InsH_Dt) = Date(?)" : "TRUE"}
				AND ${filters.phase ? "pmsysdb.phasem.Phs_Cd = ?" : "TRUE"}
				AND ${filters.classification ? "pmsysdb.classm.Cls_Cd = ?" : "TRUE"}
				AND ${filters.project ? "pmsysdb.buildm.Prj_Cd = ?" : "TRUE"}
				AND ${filters.milestone ? "pmsysdb.buildm.Mst_Cd = ?" : "TRUE"}
				AND ${filters.type ? "pmsysdb.buildm.Typ_Cd = ?" : "TRUE"}
				AND ${filters.owner ? "pmsysdb.ownm.Own_Cd = ?" : "TRUE"}
				AND  ${filters.showCancelledDocs ? "TRUE" : "InsH_Cancelled = FALSE"}
	`;

	// ********TBD ZONE FILTER
	// ********TBD SECTION FILTER

	const queryBindings: any[] = [];

	for (const keys in filters) {
		const keyItem = keys as keyof ReportFilters;
		const currentItem = filters[keyItem];
		console.log("@getReportFilter loop", keyItem, currentItem);
		if (
			currentItem !== null &&
			keyItem !== "__typename" &&
			keyItem !== "zone" &&
			keyItem !== "section" &&
			keyItem !== "showCancelledDocs"
		) {
			if (keyItem !== "date") {
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

const getReportSummaryColumns = (phaseId: string): string => {
	if (phaseId === "06C")
		return `
		
				MAX(CASE WHEN InsD_Code = 'FND' THEN COALESCE(InsD_Prg,0) END) as activityFoundation,
				MAX(CASE WHEN InsD_Code = 'SUP' THEN COALESCE(InsD_Prg,0) END) as activitySuperStructure,
				MAX(CASE WHEN InsD_Code = 'PRT' THEN COALESCE(InsD_Prg,0) END) as activityPartitionBlockWorkPlaster,
				MAX(CASE WHEN InsD_Code = 'ELE1' THEN COALESCE(InsD_Prg,0) END) as activityElectricalFirstFix,
				MAX(CASE WHEN InsD_Code = 'MCH1' THEN COALESCE(InsD_Prg,0) END) as activityMechanicalFirstFix,
				MAX(CASE WHEN InsD_Code = 'WTP' THEN COALESCE(InsD_Prg,0) END) as activityWetAreaProofing,
				MAX(CASE WHEN InsD_Code = 'SRD' THEN COALESCE(InsD_Prg,0) END) as activityScreed,
				MAX(CASE WHEN InsD_Code = 'TIL' THEN COALESCE(InsD_Prg,0) END) as activityFlooringTerrazzoEpoxy,
				MAX(CASE WHEN InsD_Code = 'WAL' THEN COALESCE(InsD_Prg,0) END) as activityWallCladding,
				MAX(CASE WHEN InsD_Code = 'ELE2' THEN COALESCE(InsD_Prg,0) END) as activityElectricalSecondFix,
				MAX(CASE WHEN InsD_Code = 'MCH2' THEN COALESCE(InsD_Prg,0) END) as activityMechanicalSecondFix,
				MAX(CASE WHEN InsD_Code = 'RWP' THEN COALESCE(InsD_Prg,0) END) as activityRoofWaterProofing,
				MAX(CASE WHEN InsD_Code = 'EPN' THEN COALESCE(InsD_Prg,0) END) as activityExternalPaint,
				MAX(CASE WHEN InsD_Code = 'IPN' THEN COALESCE(InsD_Prg,0) END) as activityInternalPaint,
				MAX(CASE WHEN InsD_Code = 'WND' THEN COALESCE(InsD_Prg,0) END) as activityWindows,
				MAX(CASE WHEN InsD_Code = 'DR' THEN COALESCE(InsD_Prg,0) END) as activityDoors,
				MAX(CASE WHEN InsD_Code = 'HNDR' THEN COALESCE(InsD_Prg,0) END) as activityHandlRails,
				MAX(CASE WHEN InsD_Code = 'MCHF' THEN COALESCE(InsD_Prg,0) END) as activityMechanical,
				MAX(CASE WHEN InsD_Code = 'ELEF' THEN COALESCE(InsD_Prg,0) END) as activityElectrical,
				MAX(CASE WHEN InsD_Code = 'KTC' THEN COALESCE(InsD_Prg,0) END) as activityKitchen,
				MAX(CASE WHEN InsD_Code = 'OTH' THEN COALESCE(InsD_Prg,0) END) as activityOthers,
			`;
	if (phaseId === "07T")
		return `
			COALESCE(MAX(CASE WHEN InsD_Code = 'BPITP' THEN InsD_Prg END),0) as activityBuildingPreComm,
			COALESCE(MAX(CASE WHEN InsD_Code = 'BPRWT' THEN InsD_Prg END),0) as activityBooster,
			COALESCE(MAX(CASE WHEN InsD_Code = 'CCSYS' THEN InsD_Prg END),0) as activityCctv,
			COALESCE(MAX(CASE WHEN InsD_Code = 'CLAFC' THEN InsD_Prg END),0) as activityCivilArchFinishes,
			COALESCE(MAX(CASE WHEN InsD_Code = 'DCTVO' THEN InsD_Prg END),0) as activityDataCablingTV,
			COALESCE(MAX(CASE WHEN InsD_Code = 'DFCHS' THEN InsD_Prg END),0) as activityDisinfectionChemmical,
			COALESCE(MAX(CASE WHEN InsD_Code = 'DISTB' THEN InsD_Prg END),0) as activityDistributionBoards,
			COALESCE(MAX(CASE WHEN InsD_Code = 'ELEWH' THEN InsD_Prg END),0) as activityelectricalWaterHeat,
			COALESCE(MAX(CASE WHEN InsD_Code = 'ELSYS' THEN InsD_Prg END),0) as activityEmergencyLighting,
			COALESCE(MAX(CASE WHEN InsD_Code = 'ELVNT' THEN InsD_Prg END),0) as activityElvNetwork,
			COALESCE(MAX(CASE WHEN InsD_Code = 'EXFAN' THEN InsD_Prg END),0) as activityExhaustFans,
			COALESCE(MAX(CASE WHEN InsD_Code = 'FASYS' THEN InsD_Prg END),0) as activityFireAlarmSystem,
			COALESCE(MAX(CASE WHEN InsD_Code = 'FDPLR' THEN InsD_Prg END),0) as activityFeederPillars,
			COALESCE(MAX(CASE WHEN InsD_Code = 'FIREX' THEN InsD_Prg END),0) as activityFireExtinguishersAndFireBlankets,
			COALESCE(MAX(CASE WHEN InsD_Code = 'FLMST' THEN InsD_Prg END),0) as activityFeederPillar,
			COALESCE(MAX(CASE WHEN InsD_Code = 'FNLIT' THEN InsD_Prg END),0) as activityFinalIntegreationAllSystems,
			COALESCE(MAX(CASE WHEN InsD_Code = 'FNLTC' THEN InsD_Prg END),0) as activityFinalTncLV,
			COALESCE(MAX(CASE WHEN InsD_Code = 'KVNET' THEN InsD_Prg END),0) as activityElevenKvNetwork,
			COALESCE(MAX(CASE WHEN InsD_Code = 'LTSYS' THEN InsD_Prg END),0) as activityLightingSystems,
			COALESCE(MAX(CASE WHEN InsD_Code = 'LVNET' THEN InsD_Prg END),0) as activityLvNetwork,
			COALESCE(MAX(CASE WHEN InsD_Code = 'MEINS' THEN InsD_Prg END),0) as activityMechEleInstallation,
			COALESCE(MAX(CASE WHEN InsD_Code = 'MFTCC' THEN InsD_Prg END),0) as activityManufacturerTncCertificate,
			COALESCE(MAX(CASE WHEN InsD_Code = 'PWIME' THEN InsD_Prg END),0) as activityPowerIsolatorsForMech,
			COALESCE(MAX(CASE WHEN InsD_Code = 'PWSYS' THEN InsD_Prg END),0) as activityPowerSystems,
			COALESCE(MAX(CASE WHEN InsD_Code = 'SLVAC' THEN InsD_Prg END),0) as activitySleevesForAC,
			COALESCE(MAX(CASE WHEN InsD_Code = 'SUBDB' THEN InsD_Prg END),0) as activitySubmainDB,
			COALESCE(MAX(CASE WHEN InsD_Code = 'SWARE' THEN InsD_Prg END),0) as activitySanitaryWare,
			COALESCE(MAX(CASE WHEN InsD_Code = 'TCDSG' THEN InsD_Prg END),0) as activityTncDeSnagggingComplete,
			COALESCE(MAX(CASE WHEN InsD_Code = 'WMEOP' THEN InsD_Prg END),0) as activityWaterMeter,
			`;

	return "";
};

export const getReportProgressDetailController = async (filters?: ReportFilters): Promise<ReportProgressDetail[]> => {
	const { queryFilter, queryBindings } = getReportFilter(filters ? filters : defaultReportFilters);

	logger.info(`@reportProgressDetailController queryFilter ${queryFilter}`);
	logger.info(`@reportProgressDetailController queryBindings ${JSON.stringify(queryBindings)}`);

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

	const response = formatReportProgressDetailController(results[0] as ReportProgressDetail[]);
	return response;
};

export const getReportProgressSummaryController = async (
	filters?: ReportFilters
): Promise<ReportProgressSummaryConstruction[] | ReportProgressSummaryTestingCommissioning[]> => {
	const { queryFilter, queryBindings } = getReportFilter(filters ? filters : defaultReportFilters);
	logger.info(`@getReportProgressSummaryController queryFilter ${queryFilter}`);
	logger.info(`@getReportProgressSummaryController queryBindings ${JSON.stringify(queryBindings)}`);

	const results = await knexMySQL.raw(
		`
			SELECT
				${getReportSummaryColumns(filters?.phase?.id || "")}
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
				InsH_Cancelled as isCancelled
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

	return results[0];
};

export const getReportFilterController = async (type: string): Promise<ReportFilter[]> => {
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

	const response = results[0] as ReportFilter[];
	return response;
};
