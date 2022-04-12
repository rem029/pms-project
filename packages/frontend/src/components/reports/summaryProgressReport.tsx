import { Grid } from "@mui/material";
import { PageContainer } from "../utilities/pageContainer";

import { ReportingSummaryProgressTable } from "components/tables/reportingSummaryProgressTable";
import { ReportFilters } from "../filters/reportFilters";

import { URL_REPORTING_PROGRESS_SUMMARY } from "utils/constants";
import { useAxios } from "hooks/useAxios";
import { ReportFilterType, ReportProgressSummaryInterface } from "types";
import { getToken } from "utils/storage";

export const SummaryProgressReport = (): JSX.Element => {
	const { data, loading, success, message, fetch, fetchCancel } = useAxios<
		ReportProgressSummaryInterface[]
	>(URL_REPORTING_PROGRESS_SUMMARY, {
		method: "get",
		headers: {
			Authorization: `Token ${getToken()}`,
		},
	});

	const handleOnSubmit = (filter: ReportFilterType): void => {
		fetchCancel();
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
				<ReportFilters onSubmit={handleOnSubmit} disableButtonApply={loading} />

				<Grid container spacing={1} justifyContent="center" padding={0.5}>
					<Grid item xs={12} sx={{ width: "100%", overflowX: "auto" }}>
						<ReportingSummaryProgressTable
							data={data}
							loading={loading}
							success={success}
							message={message}
						/>
					</Grid>
				</Grid>
			</Grid>
		</PageContainer>
	);
};
