import { Grid } from "@mui/material";
import { PageContainer } from "../utilities/pageContainer";

import { ReportingDetailProgressTable } from "../tables/reportingDetailProgressTable";
import { ReportFilters } from "../filters/reportFilters";

import { URL_REPORTING_PROGRESS_DETAILED } from "utils/constants";
import { useAxios } from "hooks/useAxios";
import {
	ReportFilters as ReportFilterFields,
	ReportProgressDetail,
} from "@pms-project/common";
import { getToken } from "utils/storage";

export const DetailProgressReport = (): JSX.Element => {
	const { data, loading, success, message, fetch, fetchCancel } = useAxios<
		ReportProgressDetail[]
	>(URL_REPORTING_PROGRESS_DETAILED, {
		method: "get",
		headers: {
			Authorization: `Token ${getToken()}`,
		},
	});

	const handleOnSubmit = (filter: ReportFilterFields): void => {
		fetchCancel();
		fetch({ params: { filter: filter } });
	};

	return (
		<PageContainer title="Progress Detail Report">
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
						<ReportingDetailProgressTable
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
