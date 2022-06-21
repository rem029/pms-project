import { ActivityByClassification, ReportFilter, ReportProgressDetail } from "./report";

export interface Inspection extends Omit<ReportProgressDetail, "__typename"> {
	__typename?: "Inspection";
}

export interface InspectionEntry {
	__typename?: "InspectionEntry";
	inspectionDate: Date | null;
	inspectNo: string | null;
	documentDate: Date | null;
	deliverable: ReportFilter | null;
	project: ReportFilter | null;
	classification: ReportFilter | null;
	owner: ReportFilter | null;
	remarks: string | null;
	activities?: ActivityByClassification[];
}
