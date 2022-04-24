import { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Drawer as DrawerMUI } from "@mui/material";
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
import { grey } from "@mui/material/colors";
import { CircularProgress, Collapse, Link, ListItemButton, Tooltip } from "@mui/material";
import {
	Summarize,
	ExitToApp,
	ExpandLess,
	ExpandMore,
	TableRowsOutlined,
	DashboardOutlined,
	InfoOutlined,
} from "@mui/icons-material";
import { useAxios } from "hooks/useAxios";
import { UserInfo } from "@wakra-project/common";
import { useNavigate } from "react-router-dom";
import { URL_USER } from "utils/constants";
import { getToken } from "utils/storage";
import { getUserContext } from "store/userProvider";
import { dateHelperFormatProper } from "helpers/dateHelper";
import { DrawerListItemWeather } from "./drawerListItemWeather";

interface AppDrawerProps extends MuiAppBarProps {
	open?: boolean;
	setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
	width: number;
}

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: "flex-end",
}));

const colorIcon = grey[500];
const colorLabel = grey[700];
const colorLabelSub = grey[600];

export const Drawer = ({ open, setOpen, width }: AppDrawerProps): JSX.Element => {
	const theme = useTheme();
	const navigate = useNavigate();
	const [userName, setUserName] = useState("");
	const [subMenuOpenReporting, setSubMenuOpenReporting] = useState<boolean>(false);
	const { logout } = getUserContext();
	const {
		data: userData,
		loading: userLoading,
		success: userSuccess,
		error: userError,
	} = useAxios<UserInfo>(URL_USER, {
		method: "GET",
		headers: {
			Authorization: `Token ${getToken()}`,
		},
		// dontLogoutOnAuthError: true,
	});

	useEffect(() => {
		if (userError) setUserName("Error");

		if (!userLoading && userSuccess && userData) {
			setUserName(userData.Usr_Name);
		}
	}, [userData, userLoading, userSuccess, userError]);

	const handleDrawerClose = (): void => {
		if (setOpen) setOpen(false);
	};

	const handleLogout = (): void => {
		logout();
	};

	const handleChangePage = (link: string): void => {
		if (setOpen) setOpen(false);
		navigate("/" + link.toLowerCase());
	};

	const handleSubMenuOpen = (): void => {
		setSubMenuOpenReporting((currentValue) => !currentValue);
	};

	return (
		<DrawerMUI
			sx={{
				width: width,
				flexShrink: 0,
				"& .MuiDrawer-paper": {
					width: width,
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
							{userLoading ? <CircularProgress size={24} /> : `Hello, ${userName}`}
						</Typography>
					</ListItemText>

					<ListItemIcon>
						<Tooltip title="Would you like to logout?">
							<IconButton onClick={handleLogout}>
								<ExitToApp />
							</IconButton>
						</Tooltip>
					</ListItemIcon>
				</ListItem>

				<DrawerListItemWeather />

				<ListItem>
					<Typography variant="caption" noWrap letterSpacing={1}>
						{dateHelperFormatProper(new Date())}
					</Typography>
				</ListItem>
			</List>
			<Divider />
			<List>
				<ListItem button key={"Dashboard"} onClick={() => handleChangePage("Dashboard")}>
					<ListItemIcon>
						<DashboardOutlined htmlColor={colorIcon} />
					</ListItemIcon>
					<ListItemText>
						<Link sx={{ textDecoration: "none", color: colorLabel }}>
							<Typography variant="body1">Dashboard</Typography>
						</Link>
					</ListItemText>
				</ListItem>
				<ListItem
					button
					disabled
					key={"Projects"}
					onClick={() => handleChangePage("Projects")}
				>
					<ListItemIcon>
						<Summarize htmlColor={colorIcon} />
					</ListItemIcon>
					<ListItemText>
						<Link sx={{ textDecoration: "none", color: colorLabel }}>
							<Typography variant="body1">Projects (WIP)</Typography>
						</Link>
					</ListItemText>
				</ListItem>
				<ListItem
					button
					disabled
					key={"Master"}
					onClick={() => handleChangePage("Master")}
				>
					<ListItemIcon>
						<Summarize htmlColor={colorIcon} />
					</ListItemIcon>
					<ListItemText>
						<Link sx={{ textDecoration: "none", color: colorLabel }}>
							<Typography variant="body1">Masters (WIP)</Typography>
						</Link>
					</ListItemText>
				</ListItem>
				<ListItem button key="Reporting" onClick={() => handleSubMenuOpen()}>
					<ListItemIcon>
						<InfoOutlined htmlColor={colorIcon} />
					</ListItemIcon>
					<ListItemText>
						<Link sx={{ textDecoration: "none", color: colorLabel }}>
							<Typography variant="body1">Reporting</Typography>
						</Link>
					</ListItemText>
					{subMenuOpenReporting ? <ExpandLess /> : <ExpandMore />}
				</ListItem>

				<Collapse in={subMenuOpenReporting} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						{[
							{ label: "Progress Detail Report", url: "report/detail-progress" },
							{ label: "Progress Summary Report", url: "report/summary-progress" },
						].map((item, index) => (
							<ListItemButton
								key={index + item.label}
								sx={{ pl: 3, color: colorLabelSub }}
								onClick={() => handleChangePage(item.url)}
							>
								<ListItemIcon>
									<TableRowsOutlined htmlColor={colorIcon} fontSize="small" />
								</ListItemIcon>
								<ListItemText
									primary={<Typography variant="body2">{item.label}</Typography>}
								/>
							</ListItemButton>
						))}
					</List>
				</Collapse>
			</List>
			<Divider />
		</DrawerMUI>
	);
};
