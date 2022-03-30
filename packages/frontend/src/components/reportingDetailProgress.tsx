import { Grid } from "@mui/material";
import { PageContainer } from "./utilities/pageContainer";

import { ReportingDetailProgressTable } from "./tables/reportingDetailProgressTable";
import { ReportFilters } from "./filters/reportFilters";

export const ReportDetailProgress = (): JSX.Element => {
	return (
		<PageContainer title="Progress Detail Report">
			<Grid
				container
				spacing={1}
				justifyContent="center"
				sx={{ p: 1 }}
				flexDirection="column"
			>
				<ReportFilters />

				<Grid container spacing={1} justifyContent="center" padding={0.5}>
					<Grid item xs={12} sx={{ width: "100%", overflowX: "auto" }}>
						<ReportingDetailProgressTable />
					</Grid>
				</Grid>
			</Grid>
		</PageContainer>
	);
};
