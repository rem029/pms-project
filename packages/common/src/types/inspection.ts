import { ReportFilter, ReportProgressDetail } from "./report";

export interface Inspection extends Omit<ReportProgressDetail, "__typename"> {
	__typename?: "Inspection";
}

export interface InspectionEntry {
	__typename?: "InspectionEntry";
	inspectionDate: Date | null;
	inspectNo: string | null;
	doumentDate: Date | null;
	project: ReportFilter | null;
	classification: ReportFilter | null;
	remarks: string | null;
}
