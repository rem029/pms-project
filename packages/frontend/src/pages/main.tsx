import * as React from "react";
import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { AppHeader, AppDrawer } from "components";

const drawerWidth = 240;

const MainContainer = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
	open?: boolean;
	width: number;
}>(({ theme, open, width }) => ({
	flexGrow: 1,
	padding: theme.spacing(2, 1),
	transition: theme.transitions.create("margin", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	marginLeft: `-${width}px`,
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

export const Main = (): JSX.Element => {
	const [open, setOpen] = React.useState(false);

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppHeader open={open} setOpen={setOpen} width={drawerWidth} />
			<AppDrawer open={open} setOpen={setOpen} width={drawerWidth} />
			<MainContainer open={open} width={drawerWidth}>
				<DrawerHeader />
				<Outlet />
			</MainContainer>
		</Box>
	);
};
