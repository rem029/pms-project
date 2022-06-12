import * as React from "react";
import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { Header, Drawer } from "components";
import { useWindowDimensions } from "hooks/useWindowDimensions";

const drawerWidth = 240;

const MainContainer = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
	open?: boolean;
	drawer: number;
	screen: number;
}>(({ theme, open, drawer, screen }) => ({
	flexGrow: 1,
	padding: theme.spacing(2, 1),
	minWidth: screen,
	maxWidth: screen,
	transition: theme.transitions.create("margin", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	marginLeft: `-${drawer}px`,
	...(open && {
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	}),
	backgroundColor: theme.palette.background.default,
}));

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: "flex-end",
	overflow: "hidden",
}));

export const Main = (): JSX.Element => {
	const [open, setOpen] = React.useState(false);
	const { width: screenWidth } = useWindowDimensions();

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<Header open={open} setOpen={setOpen} width={drawerWidth} />
			<Drawer open={open} setOpen={setOpen} width={drawerWidth} />
			<MainContainer open={open} drawer={drawerWidth} screen={screenWidth}>
				<DrawerHeader />
				<Outlet />
			</MainContainer>
		</Box>
	);
};
