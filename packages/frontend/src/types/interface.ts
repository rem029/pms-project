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

export type ReportProgressDetailActivity = {
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
