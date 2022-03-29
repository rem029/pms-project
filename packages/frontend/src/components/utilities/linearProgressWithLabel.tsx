import { Box, LinearProgress, Typography } from "@mui/material";
import { blue, green, red } from "@mui/material/colors";

//100% green
//75-99% blue
//50-75% orange
//1-50% yellow
//0% red

// const useStyles = makeStyles({
// 	colorPrimary: {
// 		backgroundColor: "#00695C",
// 	},
// 	barColorPrimary: {
// 		backgroundColor: "#B2DFDB",
// 	},
// });

export const LinearProgressWithLabel = (props: { value: number }): JSX.Element => {
	const { value } = props;
	const getColor = (): string => {
		const valueRounded = Math.round(value);
		const backgroundOpacity = 400;
		if (valueRounded >= 0 && valueRounded < 50) return red[backgroundOpacity];
		if (valueRounded > 50 && valueRounded < 75) return blue[backgroundOpacity];
		if (valueRounded > 75 && valueRounded < 100) return blue[backgroundOpacity];
		if (valueRounded === 100) return green[backgroundOpacity];

		return "primary";
	};
	return (
		<Box sx={{ display: "flex", alignItems: "center", color: getColor() }}>
			<Box sx={{ width: "100%", mr: 1 }}>
				<LinearProgress
					variant="determinate"
					value={value}
					valueBuffer={100}
					color="inherit"
				/>
			</Box>
			<Box sx={{ minWidth: 35 }}>
				<Typography variant="body2" color="text.secondary">
					{`${Math.round(value)}%`}
				</Typography>
			</Box>
		</Box>
	);
};
