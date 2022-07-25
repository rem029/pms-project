import { Grid } from "@mui/material";
import { PageContainer } from "../utilities/pageContainer";

import { ReportingSummaryProgressTable } from "components/tables/reportingSummaryProgressTable";
import { ReportFilters } from "../filters/reportFilters";

import { URL_REPORTING_PROGRESS_SUMMARY } from "utils/constants";
import { useAxios } from "hooks/useAxios";
import {
	ReportFilters as ReportFieldFields,
	ReportProgressSummaryConstruction,
	ReportProgressSummaryTestingCommissioning,
} from "@pms-project/common";
import { getToken } from "utils/storage";
import { useState } from "react";

const defaultReportFilters = {
	date: null,
	phase: { id: "06C", name: "Construction" },
	// phase: { id: "07T", name: "Testing & Commissioning" },
	classification: { id: "TP", name: "Typical Buildings" },
	project: null,
	milestone: null,
	zone: null,
	section: null,
	type: null,
	owner: null,
	building: null,
	showCancelledDocs: false,
} as ReportFieldFields;

export const SummaryProgressReport = (): JSX.Element => {
	const [reportName, setReportName] = useState({
		classificationName: defaultReportFilters.classification?.name,
		phaseName: defaultReportFilters.phase?.name,
	});

	const { data, loading, success, message, fetch, fetchCancel } = useAxios<
		ReportProgressSummaryConstruction[] | ReportProgressSummaryTestingCommissioning[]
	>(URL_REPORTING_PROGRESS_SUMMARY, {
		method: "get",
		headers: {
			Authorization: `Token ${getToken()}`,
		},
		params: { filter: defaultReportFilters },
	});

	const handleOnSubmit = (filter: ReportFieldFields): void => {
		fetchCancel();
		setReportName({
			classificationName: filter.classification?.name,
			phaseName: filter.phase?.name,
		});
		fetch({ params: { filter: filter } });
	};

	return (
		<PageContainer title="Progress Summary Report">
			<Grid
				container
				spacing={1}
				justifyContent="center"
				sx={{ p: 1 }}
				flexDirection="column"
			>
				<ReportFilters
					onSubmit={handleOnSubmit}
					disableButtonApply={loading}
					filter={defaultReportFilters}
				/>

				<Grid container spacing={1} justifyContent="center" padding={0.5}>
					<Grid item xs={12} sx={{ width: "100%", overflowX: "auto" }}>
						<ReportingSummaryProgressTable
							data={data}
							loading={loading}
							success={success}
							message={message}
							classificationName={reportName.classificationName || ""}
							phaseName={reportName.phaseName || ""}
						/>
					</Grid>
				</Grid>
			</Grid>
		</PageContainer>
	);
};
