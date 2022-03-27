import * as React from "react";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled, Toolbar, Typography, IconButton } from "@mui/material";
import { RadioButtonUnchecked, MenuOutlined } from "@mui/icons-material";

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
	setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
	width: number;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open, width }) => ({
	transition: theme.transitions.create(["margin", "width"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		width: `calc(100% - ${width}px)`,
		marginLeft: `${width}px`,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

export const AppHeader = ({ open, setOpen, width }: AppBarProps): JSX.Element => {
	const handleDrawerOpen = (): void => {
		if (setOpen) setOpen(true);
	};

	return (
		<AppBar position="fixed" open={open} width={width}>
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

				<Typography color="white" variant="body1" noWrap sx={{ flexGrow: 1 }}>
					Project Management System
				</Typography>

				<IconButton color="inherit">
					<RadioButtonUnchecked fontSize="large" />
				</IconButton>
			</Toolbar>
		</AppBar>
	);
};
