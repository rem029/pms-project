import { knexMySQL } from "services/database";
import { logger } from "utilities/logger";
import { ActivityMaster, DeliverablesMaster } from "@wakra-project/common";

import {
	ActivityByClassification,
	ActivityMasterItemInfo,
	DeliverablesMasterInfo,
} from "@wakra-project/common/src/types/report";

export const getDeliverables = async (): Promise<DeliverablesMasterInfo[]> => {
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

	return result[0] as DeliverablesMasterInfo[];
};

export const getActivities = async (): Promise<ActivityMasterItemInfo[]> => {
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
	return response;
};

export const getActivitiesByClassification = async (): Promise<ActivityByClassification[]> => {
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
	return response;
};

export const addDeliverable = async (fields: DeliverablesMaster): Promise<boolean> => {
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
	return true;
};

export const addActivity = async (fields: ActivityMaster): Promise<boolean> => {
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

	return true;
};
