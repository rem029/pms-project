export type ReportProgressDetailActivity = {
	id: number;
	code: string;
	name: string;
	comments: string;
	progress: number;
};

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
export interface UserInfo {
	Usr_Id: string;
	Usr_Name: string;
	Usr_Email: string;

	IsAdmin: number;
	IsActive: number;
	Usr_pwd: string;
	IsAdd: number;
	IsEdit: number;
	IsCancel: number;
	IsDelete: number;
}

export interface Token {
	token: string;
	expiresIn: string;
}

export interface ReportProgressDetailInterface {
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
	activities: ReportProgressDetailActivity[];
	isCancelled: number;
}
