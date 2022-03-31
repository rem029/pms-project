export const URL_BASE = "http://10.9.46.132:6060";

export const URL_LOGIN = URL_BASE + "/login";
export const URL_USER = URL_BASE + "/user";
export const URL_REPORTING_DETAIL_PROGRESS = URL_BASE + "/report/progressive-detail";

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

// "DocNo": 93,  //Inspection No. USE THIS
// "DocDt": "2022-03-02T21:00:00.000Z",  //Inspection Date. USE THIS
// "DocEdt": "2022-03-02T21:00:00.000Z", //Inspection Entry Date.
// "Prj": "B01020", //Project Code.
// "Phs": "06C", //Project Phase
// "PhsName": "Construction", //Phase Name
// "Cls": "TP", //Projet Classification Code
// "ClsName": "Typical Buildings", //Projet Classification Name
// "Bld": "1301", //Building Code
// "Own": "JUN-UCC", //Owner Name
// "Mst": "M06", //Milestone code
// "Zon": "Z01", //Zone code
// "Sec": "S13", //Section code
// "Typ": "OA", //Type code
// "Cns": "T", //Construction method code
// "Unt": 4, //units
// "Mdl": 12, //modules
// "Cancel": 0, //isCancelled, 0=not cancelled, 1=cancelled
// "id": 1,  // activityId
// "cd": "FND", //activityCode
// "nm": "FOUNDATION", //activityName
// "prg": 100, //progress
// "com": "" //Comments

// GroupBy InspectionNumber + InspectionDate
