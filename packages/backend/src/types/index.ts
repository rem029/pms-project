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
	Zon: string;
	Sec: string;
	Typ: string;
	Cns: string;
	Unt: number;
	Mdl: number;
	Cancel: number;
	id: number;
	cd: string;
	nm: string;
	prg: number;
	com: string;
}
