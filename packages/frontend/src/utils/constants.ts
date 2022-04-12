export const URL_BASE = "http://10.9.46.132:6060";

export const URL_LOGIN = URL_BASE + "/login";
export const URL_USER = URL_BASE + "/user";

export const URL_REPORTING_PROGRESS_DETAILED = URL_BASE + "/report/progress-detail";
export const URL_REPORTING_PROGRESS_SUMMARY = URL_BASE + "/report/progress-summary";

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
	inspectionNumber: "Inspection No.",
	inspectionDate: "Inspection Date",
	bldgCode: "Bldg Code",
	ownerName: "Owner Name",
	typeCode: "Type Code",
	constructionMethodName: "Construction Method Code",
	milestoneCode: "Milestone Code",
	unit: "Units",
	module: "Modules",
	phaseName: "Phase Name",
	classificationName: "Classification Name",
	isCancelled: "Is cancelled?",
	activities: {
		id: "ID",
		code: "Code",
		name: "Name",
		progress: "Progress",
		comments: "Comments",
	},
};

export const TABLE_HEADER_REPORTING_SUMMARY_PROGRESS = {
	inspectionNumber: "Inspection No.",
	inspectionDate: "Inspection Date",
	bldgCode: "Bldg Code",
	ownerName: "Owner Name",
	typeCode: "Type Code",
	constructionMethodName: "Construction Method Code",
	milestoneCode: "Milestone Code",
	unit: "Units",
	module: "Modules",
	phaseName: "Phase Name",
	classificationName: "Classification Name",
	isCancelled: "Is cancelled?",
	activities: [
		"Foundation",
		"Super Structure",
		"Partition Blockwork Plaster",
		"Electrical First Fix",
		"Mechanical First Fix",
		"Wet Area Proofing",
		"Screed",
		"Flooring Terrazzo Epoxy",
		"Wall Cladding",
		"Electrical Second Fix",
		"Mechanical Second Fix",
		"Roof Water Proofing",
		"External Paint",
		"Internal Paint",
		"Windows",
		"Doors",
		"Handrails",
		"Mechanical",
		"Electrical",
		"Kitchen",
		"Others",
	],
};
