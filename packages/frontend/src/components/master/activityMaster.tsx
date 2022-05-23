import { Grid, Typography } from "@mui/material";
import { PageContainer } from "../utilities/pageContainer";

export const ActivityMaster = (): JSX.Element => {
	return (
		<PageContainer title="Activity Master">
			<Grid
				container
				spacing={1}
				justifyContent="center"
				sx={{ p: 1 }}
				flexDirection="column"
			>
				<Grid container spacing={1} justifyContent="center" padding={0.5}>
					<Grid item xs={12} sx={{ width: "100%", overflowX: "auto" }}>
						<Typography>Work in progress</Typography>
					</Grid>
				</Grid>
			</Grid>
		</PageContainer>
	);
};
