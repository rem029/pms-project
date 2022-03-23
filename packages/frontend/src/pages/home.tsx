import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Button, Container, Grid, Paper, TextField } from "@mui/material";
import { AppHeader, AppDrawer } from "components";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
	open?: boolean;
	drawerWidth: number;
}>(({ theme, open, drawerWidth }) => ({
	flexGrow: 1,
	padding: theme.spacing(2, 1),
	transition: theme.transitions.create("margin", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	marginLeft: `-${drawerWidth}px`,
	...(open && {
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	}),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: "flex-end",
}));

export const Home = (): JSX.Element => {
	const [open, setOpen] = React.useState(false);

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppHeader open={open} setOpen={setOpen} drawerWidth={drawerWidth} />
			<AppDrawer open={open} setOpen={setOpen} drawerWidth={drawerWidth} />
			<Main open={open} drawerWidth={drawerWidth}>
				<DrawerHeader />
				<Typography color="primary" variant="h6" noWrap component="div">
					Reporting A
				</Typography>
				<Paper sx={{ flexGrow: 1, padding: 1, mt: 0.5 }} elevation={3}>
					<Typography
						color="text.secondary"
						variant="button"
						noWrap
						component="p"
						flexGrow={1}
					>
						Options
					</Typography>
					<Divider />
					<Container
						disableGutters
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							flexDirection: "column",
							width: "100%",
						}}
					>
						<TextField label="Option 1" fullWidth sx={{ p: 1, maxWidth: 560 }} />
						<TextField label="Option 2" fullWidth sx={{ p: 1, maxWidth: 560 }} />
						<TextField label="Option 3" fullWidth sx={{ p: 1, maxWidth: 560 }} />
						<TextField label="Option 4" fullWidth sx={{ p: 1, maxWidth: 560 }} />
						<Divider />
						<Button
							variant="contained"
							size="large"
							fullWidth
							sx={{ p: 1, maxWidth: 560, mt: 1 }}
						>
							Generate
						</Button>
					</Container>
				</Paper>
			</Main>
		</Box>
	);
};
