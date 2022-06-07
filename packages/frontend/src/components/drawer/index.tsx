import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
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
	const [subMenuCollapsed, setSubMenuCollapsed] = useState<Record<string, boolean>>({});
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

	const handleSubMenuOpen = (linkText: string): void => {
		setSubMenuCollapsed((currentValue) => ({
			...currentValue,
			[linkText]: !currentValue[linkText],
		}));
	};

	const collapsibleList = (
		linkText: string,
		linkTextIcon: JSX.Element,
		subList?: { label: string; url: string; icon: JSX.Element }[],
		disabled?: boolean
	): JSX.Element => {
		const hasSublist: boolean = subList ? subList.length > 0 : false;

		return (
			<>
				<ListItem
					button
					key={linkText}
					disabled={disabled}
					onClick={
						hasSublist
							? () => handleSubMenuOpen(linkText)
							: () => handleChangePage(linkText)
					}
				>
					<ListItemIcon>{linkTextIcon}</ListItemIcon>
					<ListItemText>
						<Link sx={{ textDecoration: "none", color: colorLabel }}>
							<Typography variant="body1">{linkText}</Typography>
						</Link>
					</ListItemText>
					{hasSublist && (
						<>{subMenuCollapsed[linkText] ? <ExpandLess /> : <ExpandMore />}</>
					)}
				</ListItem>
				<Collapse in={subMenuCollapsed[linkText]} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						{subList &&
							subList.map((item, index) => (
								<ListItemButton
									key={index + item.label}
									sx={{ pl: 3, color: colorLabelSub }}
									onClick={() => handleChangePage(item.url)}
								>
									<ListItemIcon>{item.icon}</ListItemIcon>
									<ListItemText
										primary={<Typography variant="body2">{item.label}</Typography>}
									/>
								</ListItemButton>
							))}
					</List>
				</Collapse>
			</>
		);
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

				{collapsibleList(
					"Projects (WIP)",
					<InfoOutlined htmlColor={colorIcon} />,
					undefined,
					true
				)}

				{collapsibleList("Masters", <InfoOutlined htmlColor={colorIcon} />, [
					{
						label: "Deliverables",
						url: "master/deliverables",
						icon: <TableRowsOutlined htmlColor={colorIcon} fontSize="small" />,
					},
					{
						label: "Activity",
						url: "master/activities",
						icon: <TableRowsOutlined htmlColor={colorIcon} fontSize="small" />,
					},
				])}

				{collapsibleList("Reporting", <InfoOutlined htmlColor={colorIcon} />, [
					{
						label: "Progress Detail Report",
						url: "report/detail-progress",
						icon: <TableRowsOutlined htmlColor={colorIcon} fontSize="small" />,
					},
					{
						label: "Progress Summary Report",
						url: "report/summary-progress",
						icon: <TableRowsOutlined htmlColor={colorIcon} fontSize="small" />,
					},
				])}
			</List>
			<Divider />
		</DrawerMUI>
	);
};
