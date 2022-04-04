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

type ReportProgressDetailActivity = {
	id: number;
	code: string;
	name: string;
	comments: string;
	progress: number;
};
export interface ReportProgressDetailInterface {
	inspectionNumber: number;
	inspectionDate: string;
	bldgCode: string;
	ownerName: string;
	typeCode: string;
	constructionMethodName: string;
	projectCode: string;
	milestoneCode: string;
	Unit: number;
	module: number;
	phaseName: string;
	classificationName: string;
	activities: ReportProgressDetailActivity[];
	isCancelled: number;
}

export interface ReportFilterItem {
	id: number;
	name: string;
}
