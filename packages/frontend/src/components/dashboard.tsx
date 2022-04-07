import { Grid, Typography } from "@mui/material";
import { LineChart, BarChart, HistogramChart, ProgressCards } from "components";

import { PageContainer } from "./utilities/pageContainer";

export const Dashboard = (): JSX.Element => {
	return (
		<PageContainer title={"Dashboard"}>
			<Grid
				container
				spacing={1}
				justifyContent="center"
				sx={{ p: 1 }}
				flexDirection="column"
			>
				<Grid container spacing={1} justifyContent="center" sx={{ pt: 1 }}>
					<Grid item xs={12} md={12} xl={3} lg={3}>
						<ProgressCards theme="primary" />
					</Grid>

					<Grid item xs={12} md={12} xl={3} lg={3}>
						<ProgressCards theme="secondary" />
					</Grid>

					<Grid item xs={12} md={12} xl={3} lg={3}>
						<ProgressCards theme="primary" />
					</Grid>

					<Grid item xs={12} md={12} xl={3} lg={3}>
						<ProgressCards theme="secondary" />
					</Grid>
				</Grid>

				<Grid container spacing={1} justifyContent="center">
					<Grid item xs={12}>
						<Typography
							color="text.secondary"
							variant="subtitle1"
							noWrap
							component="p"
							align="left"
							fontSize={24}
						>
							Charts 1
						</Typography>
					</Grid>

					<Grid item xs={12} md={12} xl={4} lg={4}>
						<LineChart />
					</Grid>
					<Grid item xs={12} md={12} xl={4} lg={4}>
						<BarChart />
					</Grid>
					<Grid item xs={12} md={12} xl={4} lg={4}>
						<HistogramChart />
					</Grid>

					<Grid item xs={12}>
						<Typography
							color="text.secondary"
							variant="subtitle1"
							noWrap
							component="p"
							align="left"
							fontSize={24}
						>
							Charts 2
						</Typography>
					</Grid>

					<Grid item xs={12} md={12} xl={12} lg={12}>
						<LineChart />
					</Grid>
					<Grid item xs={12} md={12} xl={12} lg={12}>
						<BarChart />
					</Grid>
					<Grid item xs={12} md={12} xl={12} lg={12}>
						<HistogramChart />
					</Grid>
				</Grid>
			</Grid>
		</PageContainer>
	);
};
