import { Grid } from "@mui/material";
import { PageContainer } from "../utilities/pageContainer";

import { ReportingDetailProgressTable } from "../tables/reportingDetailProgressTable";
import { ReportFilters } from "../filters/reportFilters";

import { URL_REPORTING_DETAIL_PROGRESS } from "utils/constant";
import { useAxios } from "hooks/useAxios";
import { ReportFilterType, ReportProgressDetailInterface } from "types";
import { getToken } from "utils/storage";

export const DetailProgressReport = (): JSX.Element => {
	const { data, loading, success, message, fetch } = useAxios<
		ReportProgressDetailInterface[]
	>(URL_REPORTING_DETAIL_PROGRESS, {
		method: "get",
		headers: {
			Authorization: `Token ${getToken()}`,
		},
	});

	const handleOnSubmit = (filter: ReportFilterType): void => {
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
				<ReportFilters onSubmit={handleOnSubmit} />

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
