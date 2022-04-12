type ReportProgressSummaryActivity = {
	id: number;
	progress: number;
};

type ReportProgressDetailActivity = ReportProgressSummaryActivity & {
	code: string;
	name: string;
	comments: string;
};

export interface ReportInterface {
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
export interface ReportProgressDetailInterface extends ReportInterface {
	activities: ReportProgressDetailActivity[];
}

export interface ReportProgressSummaryInterface extends ReportInterface {
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

export interface ReportFilterItem {
	id: number;
	name: string;
}

export type ReportFilterType = {
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
};

export interface ReportFilter {
	id: string;
	name: string;
}
