export const URL_BASE = "http://10.9.46.132:6060";

export const URL_LOGIN = URL_BASE + "/login";
export const URL_USER = URL_BASE + "/user";

export const URL_REPORTING_DETAIL_PROGRESS = URL_BASE + "/report/progressive-detail";

export const URL_REPORTING_FILTER_PHASE = URL_BASE + "/report/filter/phase";
export const URL_REPORTING_FILTER_CLASSIFICATION =
	URL_BASE + "/report/filter/classification";
export const URL_REPORTING_FILTER_PROJECT = URL_BASE + "/report/filter/project";
export const URL_REPORTING_FILTER_MILESTONE = URL_BASE + "/report/filter/milestone";
export const URL_REPORTING_FILTER_ZONE = URL_BASE + "/report/filter/zone";
export const URL_REPORTING_FILTER_SECTION = URL_BASE + "/report/filter/section";
export const URL_REPORTING_FILTER_TYPE = URL_BASE + "/report/filter/type";
export const URL_REPORTING_FILTER_OWNER = URL_BASE + "/report/filter/owner";
export const URL_REPORTING_FILTER_BUILDING = URL_BASE + "/report/filter/building";

export const NOTISTACK_AUTO_HIDE_MS = 1500;

export const TABLE_HEADER_REPORTING_DETAIL_PROGRESS = {
	DocNo: "Inspection No.",
	DocDt: "Inspection Date",
	DocEdt: "Inspection Entry Date",
	Prj: "Project Code",
	Phs: "Phase Code",
	PhsName: "Phase Name",
	Cls: "Classification Code",
	ClsName: "Classification Name",
	Bld: "Bldg Code",
	Own: "Owner Name",
	Mst: "Milestone Code",
	Zon: "Zone Code",
	Sec: "Section Code",
	Typ: "Type Code",
	Cns: "Construction Method Code",
	Unt: "Units",
	Mdl: "Modules",
	Cancel: "Is cancelled?",
	id: "ID",
	cd: "Code",
	nm: "Name",
	prg: "Progress",
	com: "Comments",
};
