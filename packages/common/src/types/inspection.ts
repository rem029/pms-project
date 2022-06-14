import { ReportProgressDetail } from "./report";

export interface InspectionEntry extends Omit<ReportProgressDetail, "__typename"> {
	__typename?: "Inspection";
}
