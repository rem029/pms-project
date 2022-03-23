import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { grey, yellow } from "@mui/material/colors";
import { Tooltip } from "@mui/material";
import { LogoutOutlined, Summarize, Assessment, WbSunny } from "@mui/icons-material";
import { deleteToken } from "utilities/storage";

interface AppDrawerProps extends MuiAppBarProps {
	open?: boolean;
	setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
	drawerWidth: number;
}

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: "flex-end",
}));

export const AppDrawer = ({
	open,
	setOpen,
	drawerWidth,
}: AppDrawerProps): JSX.Element => {
	const theme = useTheme();

	const handleDrawerClose = (): void => {
		if (setOpen) setOpen(false);
	};

	const handleLogout = (): void => {
		deleteToken();
		window.location.reload();
	};

	return (
		<Drawer
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				"& .MuiDrawer-paper": {
					width: drawerWidth,
					boxSizing: "border-box",
				},
			}}
			variant="persistent"
			anchor="left"
			open={open}
		>
			<DrawerHeader>
				<IconButton onClick={handleDrawerClose}>
					{theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
				</IconButton>
			</DrawerHeader>
			<Divider />
			<List>
				<ListItem>
					<ListItemText>
						<Typography variant="body1" noWrap letterSpacing={1}>
							Hello, User
						</Typography>
					</ListItemText>

					<ListItemIcon>
						<Tooltip title="Would you like to logout?">
							<IconButton onClick={handleLogout}>
								<LogoutOutlined />
							</IconButton>
						</Tooltip>
					</ListItemIcon>
				</ListItem>
				<ListItem>
					<ListItemIcon>
						<WbSunny htmlColor={yellow[600]} />
					</ListItemIcon>
					<ListItemText>
						<Typography variant="body1" noWrap letterSpacing={1}>
							24C, Thursday
						</Typography>
					</ListItemText>
				</ListItem>
				<ListItem>
					<Typography variant="caption" noWrap letterSpacing={1}>
						26th of March 2022
					</Typography>
				</ListItem>
			</List>
			<Divider />
			<List>
				{["Reporting A", "Reporting B", "Reporting C", "Reporting D"].map(
					(text, index) => (
						<ListItem button key={text}>
							<ListItemIcon>
								{index % 2 === 0 ? (
									<Summarize color="primary" />
								) : (
									<Assessment color="secondary" />
								)}
							</ListItemIcon>
							<ListItemText primary={text} color={grey[50]} />
						</ListItem>
					)
				)}
			</List>
			<Divider />
		</Drawer>
	);
};
