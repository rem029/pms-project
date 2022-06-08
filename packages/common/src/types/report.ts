export interface ReportFilters {
	__typename?: "ReportFilters";
	date: Date | null;
	phase: ReportFilter | null;
	classification: ReportFilter | null;
	project: ReportFilter | null;
	milestone: ReportFilter | null;
	zone: ReportFilter | null;
	section: ReportFilter | null;
	type: ReportFilter | null;
	owner: ReportFilter | null;
	building: ReportFilter | null;
	showCancelledDocs: boolean;
	// sortBy: "Date" | "Building" | "Owner" | "Milestone" | "Zone";
}

export interface DeliverablesMaster extends Omit<ReportFilters, "__typename"> {
	__typename?: "DeliverablesMaster";
	code: string | null;
	name: string | null;
	units: number | null;
	modules: number | null;
	construction: ReportFilter | null;
}

export interface ActivityMaster extends Omit<ReportFilters, "__typename"> {
	__typename?: "ActivityMaster";
	code: string | null;
	name: string | null;
	activityOrder: number | null;
}

export interface ReportFilter {
	__typename?: "ReportFilter";
	id: string;
	name: string;
}

export type ReportProgressSummaryActivity = {
	__typename?: "ReportProgressSummaryActivity";
	id: number;
	progress: number;
};

export type ReportProgressDetailActivity = ReportProgressSummaryActivity & {
	__typename?: "ReportProgressDetailActivity";
	code: string;
	name: string;
	comments: string;
};
export interface Report {
	__typename?: "Report";
	inspectionNumber: number;
	inspectionDate: Date;
	bldgCode: string;
	ownerName: string;
	typeCode: string;
	constructionMethodName: string;
	projectCode: string;
	milestoneCode: string;
	unit: number;
	module: number;
	phaseName: string;
	classificationName: string;
	isCancelled: number;
}
export interface ReportProgressDetail extends Omit<Report, "__typename"> {
	__typename?: "ReportProgressDetail";
	activities: ReportProgressDetailActivity[];
}

export interface ReportProgressSummaryConstruction extends Omit<Report, "__typename"> {
	__typename?: "ReportProgressSummaryConstruction";
	activityFoundation: number;
	activitySuperStructure: number;
	activityPartitionBlockWorkPlaster: number;
	activityElectricalFirstFix: number;
	activityMechanicalFirstFix: number;
	activityWetAreaProofing: number;
	activityScreed: number;
	activityFlooringTerrazzoEpoxy: number;
	activityWallCladding: number;
	activityElectricalSecondFix: number;
	activityMechanicalSecondFix: number;
	activityRoofWaterProofing: number;
	activityExternalPaint: number;
	activityInternalPaint: number;
	activityWindows: number;
	activityDoors: number;
	activityHandlRails: number;
	activityMechanical: number;
	activityElectrical: number;
	activityKitchen: number;
	activityOthers: number;
}

export interface ReportProgressSummaryTestingCommissioning
	extends Omit<Report, "__typename"> {
	__typename?: "ReportProgressSummaryTestingCommissioning";
	activityBuildingPreComm: number;
	activityBooster: number;
	activityCctv: number;
	activityCivilArchFinishes: number;
	activityDataCablingTV: number;
	activityDisinfectionChemmical: number;
	activityDistributionBoards: number;
	activityelectricalWaterHeat: number;
	activityEmergencyLighting: number;
	activityElvNetwork: number;
	activityExhaustFans: number;
	activityFireAlarmSystem: number;
	activityFeederPillars: number;
	activityFireExtinguishersAndFireBlankets: number;
	activityFeederPillarLvMwPanels: number;
	activityFinalIntegreationAllSystems: number;
	activityFinalTncLV: number;
	activityElevenKvNetwork: number;
	activityLightingSystems: number;
	activityLvNetwork: number;
	activityMechEleInstallation: number;
	activityManufacturerTncCertificate: number;
	activityPowerIsolatorsForMech: number;
	activityPowerSystems: number;
	activitySleevesForAC: number;
	activitySubmainDB: number;
	activitySanitaryWare: number;
	activityTncDeSnagggingComplete: number;
	activityWaterMeter: number;
}
