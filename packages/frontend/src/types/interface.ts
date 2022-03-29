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

export type Activity = {
	id: number;
	code: number;
	name: string;
	progress: number;
	comment: string;
};
export interface ReportProgressDetailInterface {
	DocNo: number;
	DocDt: string;
	DocEdt: string;
	Prj: string;
	Phs: string;
	PhsName: string;
	Cls: string;
	ClsName: string;
	Bld: string;
	Own: string;
	Mst: string;
	Mdl: number;
	Zon: string;
	Sec: string;
	Typ: string;
	Cns: string;
	Unt: number;
	Cancel: number;
	id: number;
	cd: string;
	nm: string;
	prg: number;
	com: string;
	activities: Activity[];
}
