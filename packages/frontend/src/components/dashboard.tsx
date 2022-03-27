import { Divider, Grid, Paper, Typography } from "@mui/material";
import { LineChart, BarChart, HistogramChart } from "components";
import { Options } from "./options";
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
				<Options />

				<Paper sx={{ flexGrow: 1, padding: 1, mt: 0.5 }} elevation={3}>
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

						<Divider sx={{ width: "99%" }} />
					</Grid>
				</Paper>

				<Paper sx={{ flexGrow: 1, padding: 1, mt: 0.5 }} elevation={3}>
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
								Chart 2
							</Typography>
						</Grid>

						<Grid item xs={12}>
							<BarChart />
						</Grid>

						<Divider sx={{ width: "99%" }} />
					</Grid>
				</Paper>

				<Paper sx={{ flexGrow: 1, padding: 1, mt: 0.5 }} elevation={3}>
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
								Chart 3
							</Typography>
						</Grid>

						<Grid item xs={12}>
							<LineChart />
						</Grid>

						<Divider sx={{ width: "99%" }} />
					</Grid>
				</Paper>

				<Paper sx={{ flexGrow: 1, padding: 1, mt: 0.5 }} elevation={3}>
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
								Chart 4
							</Typography>
						</Grid>

						<Grid item xs={12} md={12} xl={6} lg={6}>
							<BarChart />
						</Grid>
						<Grid item xs={12} md={12} xl={6} lg={6}>
							<LineChart />
						</Grid>

						<Divider sx={{ width: "99%" }} />
					</Grid>
				</Paper>
			</Grid>
		</PageContainer>
	);
};
