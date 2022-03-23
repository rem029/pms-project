import * as React from "react";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled, Toolbar, Typography, IconButton, Breadcrumbs } from "@mui/material";
import { RadioButtonUnchecked, MenuOutlined } from "@mui/icons-material";

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
	setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
	drawerWidth: number;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open, drawerWidth }) => ({
	transition: theme.transitions.create(["margin", "width"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: `${drawerWidth}px`,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

export const AppHeader = ({ open, setOpen, drawerWidth }: AppBarProps): JSX.Element => {
	const handleDrawerOpen = (): void => {
		if (setOpen) setOpen(true);
	};

	return (
		<AppBar position="fixed" open={open} drawerWidth={drawerWidth}>
			<Toolbar>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					onClick={handleDrawerOpen}
					edge="start"
					sx={{ ...(open && { display: "none" }) }}
				>
					<MenuOutlined />
				</IconButton>
				<Breadcrumbs sx={{ flexGrow: 1 }} separator="|">
					<Typography color="white" variant="body2" noWrap>
						Reporting
					</Typography>
					<Typography color="white" variant="body1" noWrap>
						Project Management System
					</Typography>
				</Breadcrumbs>

				<IconButton color="inherit">
					<RadioButtonUnchecked />
				</IconButton>
			</Toolbar>
		</AppBar>
	);
};
