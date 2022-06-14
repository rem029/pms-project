import {
	Box,
	Button,
	Divider,
	Grid,
	Link,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import { AxiosRequestConfig } from "axios";
import { AutoCompleteInputOptions } from "components/utilities/autoCompleteInput";
import { useAxios } from "hooks/useAxios";
import { useEffect, useMemo, useState } from "react";
import {
	URL_REPORTING_FILTER_CLASSIFICATION,
	URL_REPORTING_FILTER_PHASE,
	URL_REPORTING_FILTER_PROJECT,
	URL_REPORTING_MASTER_ACTIVITY,
	URL_REPORTING_PROJECT_INSPECTION_ADD,
	URL_REPORTING_PROJECT_INSPECTION_GET,
} from "utils/constants";
import { getToken } from "utils/storage";

import { PageContainer } from "components/utilities/pageContainer";
import {
	ActivityMaster as ActivityMasterInterface,
	InspectionEntry as InspectionEntryItem,
} from "@wakra-project/common";
import {
	RestartAlt,
	SaveAlt,
	TableBarOutlined,
	TableChartOutlined,
} from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

export const InspectionEntry = (): JSX.Element => {
	const navigate = useNavigate();
	/**
	 * States
	 *
	 *
	 */
	const { enqueueSnackbar } = useSnackbar();

	/**
	 * API Fetching
	 *
	 *
	 */
	const {
		fetch: getProjectInspectionFetch,
		data: getProjectInspectionData,
		loading: getProjectInspectionLoading,
		message: getProjectInspectionMessage,
		success: getProjectInspectionSuccess,
	} = useAxios<InspectionEntryItem[]>(URL_REPORTING_PROJECT_INSPECTION_GET);

	/**
	 * API Posting
	 *
	 *
	 */

	/**
	 * Event Handlers
	 *
	 *
	 */

	const handleNavigateToInspectionEntry = (): void => {
		navigate("/projects/inspections");
	};

	useEffect(() => {
		getProjectInspectionFetch({
			method: "GET",
			headers: {
				Authorization: `Token ${getToken()}`,
			},
		});
	}, []);

	useEffect(() => {
		console.log("getProjectInspectionData", getProjectInspectionData);
	}, [getProjectInspectionData]);

	return (
		<PageContainer title="Inspection Table">
			<Grid
				component={Paper}
				container
				sx={{ flexGrow: 1, padding: 1, mt: 0.5 }}
				elevation={3}
				spacing={1}
				justifyContent="center"
			>
				<Grid xs={12}>
					<Button
						startIcon={<TableChartOutlined />}
						onClick={handleNavigateToInspectionEntry}
						variant="outlined"
						size="large"
						fullWidth
					>
						View all inspections
					</Button>
				</Grid>
			</Grid>
		</PageContainer>
	);
};
