import {
	Box,
	Button,
	CircularProgress,
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
	Inspection,
} from "@wakra-project/common";
import { Add, RestartAlt, SaveAlt } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

export const InspectionTable = (): JSX.Element => {
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
	} = useAxios<Inspection[]>(URL_REPORTING_PROJECT_INSPECTION_GET);

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
		navigate("/projects/inspections/entry");
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
						startIcon={<Add />}
						onClick={handleNavigateToInspectionEntry}
						variant="contained"
						size="large"
						fullWidth
					>
						New inspection entry
					</Button>
				</Grid>
				<Grid xs={12} alignItems="center">
					{getProjectInspectionLoading && (
						<CircularProgress
							sx={{
								flexGrow: 1,
								justifyContent: "center",
								display: "flex",
								m: "auto",
								padding: 1,
							}}
							size={56}
						/>
					)}
				</Grid>
				<Grid xs={12}>
					{getProjectInspectionData && (
						<DataGrid
							autoHeight
							headerHeight={96}
							pageSize={10}
							rowsPerPageOptions={[10, 50, 100]}
							loading={getProjectInspectionLoading}
							getRowId={(row) => row.inspectionNumber}
							columns={[
								{
									field: "inspectionNumber",
									headerName: "Inspection Number",
									flex: 1,
								},
								{
									field: "inspectionDate",
									headerName: "Inspection Date",
									flex: 1,
									valueFormatter: (params) => new Date(params.value).toDateString(),
								},
								{
									field: "documentDate",
									headerName: "Document Date",
									flex: 1,
									valueFormatter: (params) => new Date(params.value).toDateString(),
								},
								{ field: "project", headerName: "Project", flex: 1 },
								{ field: "phase", headerName: "Phase", flex: 1 },
								{ field: "building", headerName: "Building", flex: 1 },
								{ field: "owner", headerName: "Owner", flex: 1 },
								{ field: "remarks", headerName: "Remarks", flex: 1 },
							]}
							rows={getProjectInspectionData as readonly Inspection[]}
						/>
					)}
				</Grid>
			</Grid>
		</PageContainer>
	);
};
