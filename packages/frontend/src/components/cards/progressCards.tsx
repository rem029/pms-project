import { Grid, Paper, Typography } from "@mui/material";

export const ProgressCards = ({
	theme,
}: {
	theme?: "primary" | "secondary";
}): JSX.Element => {
	const getTheme = (): {
		backgroundColor: string;
		color: string;
	} => {
		if (theme && theme === "primary")
			return { backgroundColor: "white", color: "primary" };
		if (theme && theme === "secondary")
			return { backgroundColor: "white", color: "secondary" };

		return { backgroundColor: "white", color: "black" };
	};
	return (
		<Grid item xs={12} md={12} xl={3} lg={3}>
			<Paper
				sx={{
					padding: 1,
					height: 160,
					backgroundColor: getTheme().backgroundColor,
					display: "flex",
					alignItems: "flex-start",
					justifyContent: "center",
					flexDirection: "column",
				}}
				elevation={3}
			>
				<Typography
					color={getTheme().color}
					variant="h5"
					noWrap
					component="p"
					align="left"
				>
					Summary
				</Typography>
				<Typography
					color={getTheme().color}
					variant="h4"
					noWrap
					component="p"
					align="left"
				>
					100%
				</Typography>

				<Typography
					color={getTheme().color}
					variant="body2"
					noWrap
					component="p"
					align="left"
				>
					Progress vs last week
				</Typography>
			</Paper>
		</Grid>
	);
};
