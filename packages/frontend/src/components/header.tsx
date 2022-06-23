import * as React from "react";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled, Toolbar, Typography, IconButton } from "@mui/material";
import { MenuOutlined } from "@mui/icons-material";
import { APP_NAME } from "utils/constants";

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

export const Header = ({ open, setOpen, width }: AppBarProps): JSX.Element => {
	const handleDrawerOpen = (): void => {
		if (setOpen) setOpen(true);
	};

	return (
		<AppBar
			position="fixed"
			open={open}
			width={width}
			sx={{
				backgroundColor: (theme) => theme.palette.primary.main,
				color: (theme) => theme.palette.primary.contrastText,
			}}
		>
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

				<Typography variant="body1" noWrap sx={{ width: "95%" }}>
					Project Management System
				</Typography>
				{/* <Box component="img" src={logo} sx={{ width: 72 }} /> */}

				<Typography variant="h6" align="center" color="white" letterSpacing={4}>
					{APP_NAME}
				</Typography>
			</Toolbar>
		</AppBar>
	);
};
