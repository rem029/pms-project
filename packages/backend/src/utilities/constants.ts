export type ReportFilterTableInfo = { columnName: string; tableName: string };

export const REPORT_FILTER: Record<string, ReportFilterTableInfo> = {
	zone: {
		columnName: "Zone",
		tableName: "zonem",
	},
	milestone: {
		columnName: "Mst",
		tableName: "mstm",
	},
	project: {
		columnName: "Prj",
		tableName: "projm",
	},
	classification: {
		columnName: "Cls",
		tableName: "classm",
	},
	phase: {
		columnName: "Phs",
		tableName: "phasem",
	},
	section: {
		columnName: "Sec",
		tableName: "sectionm",
	},
	type: {
		columnName: "Type",
		tableName: "typem",
	},
	owner: {
		columnName: "Own",
		tableName: "ownm",
	},
	building: {
		columnName: "Bld",
		tableName: "buildm",
	},
};
