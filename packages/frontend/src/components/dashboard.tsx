import { Button, Divider, Grid, Paper, TextField, Typography } from "@mui/material";
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
				<Paper sx={{ flexGrow: 1, padding: 1, mt: 0.5 }} elevation={3}>
					<Grid container spacing={1} justifyContent="center">
						<Grid item xs={12}>
							<Typography
								color="text.secondary"
								variant="button"
								noWrap
								component="p"
								align="left"
							>
								Filter
							</Typography>
						</Grid>

						<Divider sx={{ width: "99%" }} />
						<Grid item xs={12}>
							<TextField label="Option 1" fullWidth sx={{ p: 1, maxWidth: 480 }} />
							<TextField label="Option 2" fullWidth sx={{ p: 1, maxWidth: 480 }} />
							<TextField label="Option 3" fullWidth sx={{ p: 1, maxWidth: 480 }} />
						</Grid>

						<Divider sx={{ width: "99%" }} />

						<Grid item xs={12}>
							<Button
								variant="contained"
								size="large"
								fullWidth
								sx={{ p: 1, maxWidth: 720 }}
							>
								Apply
							</Button>
						</Grid>
					</Grid>
				</Paper>

				<Paper sx={{ flexGrow: 1, padding: 1, mt: 0.5 }} elevation={3}>
					<Grid container spacing={1} justifyContent="center">
						<Grid item xs={12}>
							<Typography
								color="text.secondary"
								variant="button"
								noWrap
								component="p"
								align="left"
							>
								Chart 1
							</Typography>
						</Grid>

						<Divider sx={{ width: "99%" }} />
					</Grid>
				</Paper>
			</Grid>
		</PageContainer>
	);
};
