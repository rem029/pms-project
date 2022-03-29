import { Grid } from "@mui/material";
import { PageContainer } from "./utilities/pageContainer";
import { Options } from "./options";
import { ReportingDetailProgressTable } from "./tables/reportingDetailProgressTable";

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
				<Options />

				<Grid container spacing={1} justifyContent="center" padding={0.5}>
					<Grid item xs={12} sx={{ width: "100%", overflowX: "auto" }}>
						<ReportingDetailProgressTable />
					</Grid>
				</Grid>
			</Grid>
		</PageContainer>
	);
};
