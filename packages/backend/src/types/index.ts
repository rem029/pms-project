import { Request } from "express";

export interface RequestAuthInterface extends Request {
	user?: { userId: string; password?: string };
}

export interface ResponseInterface<T> {
	success: boolean;
	message: string;
	data?: T;
	error?: Error;
}

export interface UserInfo {
	Usr_Id: string;
	Usr_Name: string;
	Usr_Email: string;
	Usr_Ph: string;
	IsAdmin: number; //if full access = 1
	IsActive: number; //If account is activated = 1
	IsAdd: number; //can create new entries
	IsEdit: number;
	IsCancel: number;
	IsDelete: number;
}

type ReportProgressSummaryActivity = {
	id: number;
	progress: number;
};

type ReportProgressDetailActivity = ReportProgressSummaryActivity & {
	code: string;
	name: string;
	comments: string;
};
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

export interface ReportProgressSummaryInterface {
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
	activities: ReportProgressSummaryActivity[];
	isCancelled: number;
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
