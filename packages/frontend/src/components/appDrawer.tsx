import { useEffect, useState } from "react";
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
import { yellow, grey } from "@mui/material/colors";
import { CircularProgress, Collapse, Link, ListItemButton, Tooltip } from "@mui/material";
import {
	Summarize,
	Assessment,
	WbSunny,
	ExitToApp,
	ExpandLess,
	ExpandMore,
	StarBorder,
} from "@mui/icons-material";
import { userLogout } from "utilities/userLogout";
import { useAxios } from "hooks/useAxios";
import { UserInfo } from "types/interface";
import { useNavigate } from "react-router-dom";
import { URL_USER } from "utilities/constant";
import { getToken } from "utilities/storage";
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

export const AppDrawer = ({ open, setOpen, width }: AppDrawerProps): JSX.Element => {
	const theme = useTheme();
	const navigate = useNavigate();
	const [userName, setUserName] = useState("");
	const [subMenuOpenReporting, setSubMenuOpenReporting] = useState<boolean>(false);

	const {
		data: userData,
		fetch: userFetch,
		loading: userLoading,
		success: userSuccess,
		error: userError,
	} = useAxios<UserInfo>(URL_USER);

	useEffect(() => {
		const token = getToken();

		if (token)
			userFetch({
				headers: {
					Authorization: `Token ${token}`,
				},
			});
	}, []);

	useEffect(() => {
		if (userError) setUserName("Error");

		if (!userLoading && userSuccess && userData) {
			setUserName(userData.Usr_Name);
		}
	}, [userData, userLoading, userSuccess]);

	const handleDrawerClose = (): void => {
		if (setOpen) setOpen(false);
	};

	const handleLogout = (): void => {
		userLogout();
	};

	const handleChangePage = (link: string): void => {
		if (setOpen) setOpen(false);
		navigate("/" + link.toLowerCase());
	};

	const handleSubMenuOpen = (): void => {
		setSubMenuOpenReporting((currentValue) => !currentValue);
	};

	return (
		<Drawer
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
							Hello,
							{userLoading ? <CircularProgress size={24} /> : userName}
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
				{["Dashboard", "Master", "Projects", "Reporting"].map((text, index) => (
					<ListItem
						button
						key={text}
						onClick={() =>
							text === "Reporting" ? handleSubMenuOpen() : handleChangePage(text)
						}
					>
						<ListItemIcon>
							{index % 2 === 0 ? (
								<Summarize color="primary" />
							) : (
								<Assessment color="secondary" />
							)}
						</ListItemIcon>
						<ListItemText>
							<Link sx={{ textDecoration: "none", color: grey[600] }}>{text}</Link>
						</ListItemText>
						{text === "Reporting" ? (
							subMenuOpenReporting ? (
								<ExpandLess />
							) : (
								<ExpandMore />
							)
						) : (
							<></>
						)}
					</ListItem>
				))}

				<Collapse in={subMenuOpenReporting} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItemButton
							sx={{ pl: 4 }}
							onClick={() => handleChangePage("report-detail-progress")}
						>
							<ListItemIcon>
								<StarBorder />
							</ListItemIcon>
							<ListItemText primary="Progress Detail Report" />
						</ListItemButton>

						<ListItemButton sx={{ pl: 4 }} onClick={() => handleChangePage("reportingB")}>
							<ListItemIcon>
								<StarBorder />
							</ListItemIcon>
							<ListItemText primary="Reporting for B" />
						</ListItemButton>

						<ListItemButton sx={{ pl: 4 }} onClick={() => handleChangePage("reportingC")}>
							<ListItemIcon>
								<StarBorder />
							</ListItemIcon>
							<ListItemText primary="Reporting for C" />
						</ListItemButton>
					</List>
				</Collapse>
			</List>
			<Divider />
		</Drawer>
	);
};
