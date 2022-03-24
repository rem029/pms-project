import { Button, Divider, Grid, TextField, Typography } from "@mui/material";
import { PageContainer } from "./utilities/pageContainer";

export const Project = (): JSX.Element => {
	return (
		<PageContainer title={"Project"}>
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
					<TextField label="Option 1" fullWidth sx={{ p: 1, maxWidth: 560 }} />
					<TextField label="Option 2" fullWidth sx={{ p: 1, maxWidth: 560 }} />
					<TextField label="Option 3" fullWidth sx={{ p: 1, maxWidth: 560 }} />
					<TextField label="Option 4" fullWidth sx={{ p: 1, maxWidth: 560 }} />
				</Grid>

				<Divider sx={{ width: "99%" }} />

				<Grid item xs={12}>
					<Button variant="contained" size="large" fullWidth sx={{ p: 1, maxWidth: 720 }}>
						Generate
					</Button>
				</Grid>
			</Grid>
		</PageContainer>
	);
};
