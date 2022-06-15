import { Box, Button, Divider, Grid, Paper, TextField, Typography } from "@mui/material";
import { AxiosRequestConfig } from "axios";
import {
	AutoCompleteInput,
	AutoCompleteInputOptions,
} from "components/utilities/autoCompleteInput";
import { useAxios } from "hooks/useAxios";
import { useEffect, useMemo, useState } from "react";
import {
	URL_REPORTING_FILTER_CLASSIFICATION,
	URL_REPORTING_FILTER_PHASE,
	URL_REPORTING_FILTER_PROJECT,
	URL_REPORTING_MASTER_ACTIVITY,
	URL_REPORTING_PROJECT_INSPECTION_ADD,
	URL_REPORTING_MASTER_ACTIVITY_BY_CLASSIFICATION_GET,
} from "utils/constants";
import { getToken } from "utils/storage";
import { PageContainer } from "components/utilities/pageContainer";
import {
	ActivityByClassification,
	InspectionEntry as InspectionEntryInterface,
} from "@wakra-project/common";
import { RestartAlt, SaveAlt } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { DataGrid } from "@mui/x-data-grid";

const defaultFields = {
	doumentDate: null,
	inspectionDate: null,
	inspectNo: "",
	project: null,
	classification: null,
	remarks: "",
} as InspectionEntryInterface;

export const InspectionEntry = (): JSX.Element => {
	/**
	 * States
	 *
	 *
	 */
	const [fields, setFields] = useState<InspectionEntryInterface>(defaultFields);
	const { enqueueSnackbar } = useSnackbar();

	const axiosConfigReportFilter: AxiosRequestConfig = useMemo(() => {
		return {
			method: "GET",
			headers: {
				Authorization: `Token ${getToken()}`,
			},
		};
	}, []);

	/**
	 * API Fetching
	 *
	 *
	 */
	const { data: filterProjectData, loading: filterProjectLoading } = useAxios<
		AutoCompleteInputOptions[]
	>(URL_REPORTING_FILTER_PROJECT, axiosConfigReportFilter);

	const { data: filterClassificationData, loading: filterClassificationLoading } =
		useAxios<AutoCompleteInputOptions[]>(
			URL_REPORTING_FILTER_CLASSIFICATION,
			axiosConfigReportFilter
		);

	const { data: activityByClassificationData, loading: activityByClassificationLoading } =
		useAxios<ActivityByClassification[]>(
			URL_REPORTING_MASTER_ACTIVITY_BY_CLASSIFICATION_GET,
			axiosConfigReportFilter
		);

	/**
	 * API Posting
	 *
	 *
	 */
	const {
		fetch: dataPost,
		loading: dataLoading,
		message: dataMessage,
		success: dataSuccess,
	} = useAxios<InspectionEntryInterface[]>(URL_REPORTING_PROJECT_INSPECTION_ADD);

	useEffect(() => {
		if (dataMessage) {
			enqueueSnackbar(dataMessage, {
				variant: dataSuccess ? "info" : "error",
			});
		}
	}, [dataSuccess]);

	/**
	 * Event Handlers
	 *
	 *
	 */
	const handleFormReset = (event: React.FormEvent<HTMLDivElement>): void => {
		event.preventDefault();
		setFields(defaultFields);
	};

	const handleFormSubmit = (event: React.FormEvent<HTMLDivElement>): void => {
		event.preventDefault();

		dataPost({
			method: "POST",
			headers: {
				Authorization: `Token ${getToken()}`,
				Accept: "application/json",
				"Content-type": "application/json",
				data: JSON.stringify({ ...fields, doumentDate: new Date() }),
			},
		});
	};

	const handleFormChange = (
		name: string,
		value: AutoCompleteInputOptions | string | number | null
	): void => {
		setFields((currentFields) => ({
			...currentFields,
			[name]: value,
		}));
	};

	return (
		<PageContainer title="Inspection Entry">
			<Grid
				component={Paper}
				container
				sx={{ flexGrow: 1, padding: 1, mt: 0.5 }}
				elevation={3}
				spacing={1}
				justifyContent="center"
			>
				<Box
					component="form"
					sx={{ width: "100%" }}
					onReset={handleFormReset}
					onSubmit={handleFormSubmit}
				>
					<Grid container spacing={1} justifyContent="flex-start">
						<Grid item lg={9} sm={12} xs={12}>
							<AutoCompleteInput
								name="project"
								label="Project"
								loading={filterProjectLoading}
								options={filterProjectData as AutoCompleteInputOptions[]}
								value={fields?.project as AutoCompleteInputOptions}
								handleChange={handleFormChange}
							/>
						</Grid>
						<Grid item lg={12} sm={12} xs={12} />
						<Grid item lg={3} sm={6} xs={12}>
							<AutoCompleteInput
								name="classification"
								label="Classification"
								loading={filterClassificationLoading}
								options={filterClassificationData as AutoCompleteInputOptions[]}
								value={fields?.classification as AutoCompleteInputOptions}
								handleChange={handleFormChange}
							/>
						</Grid>
						<Grid component={Box} item xs={12} sx={{ p: 1 }}>
							<Divider sx={{ width: "100%" }} />
						</Grid>

						<Grid item lg={6} sm={12} xs={12}>
							<TextField
								fullWidth
								name="inspectNo"
								label="Inspection#"
								value={fields.inspectNo || ""}
								placeholder="Enter entry inspection#"
								onChange={(e) =>
									handleFormChange(e.target.name, e.target.value as string)
								}
							/>
						</Grid>
						<Grid item lg={12} sm={12} xs={12} />
						<Grid item lg={6} sm={12} xs={12}>
							<TextField
								fullWidth
								multiline
								rows={5}
								name="remarks"
								label="Remarks"
								value={fields.remarks || ""}
								placeholder="Enter remarks"
								onChange={(e) =>
									handleFormChange(e.target.name, e.target.value as string)
								}
							/>
						</Grid>

						<Grid component={Box} item xs={12} sx={{ p: 1 }}>
							<Divider sx={{ width: "100%" }} />
						</Grid>

						<Grid xs={12}>
							{activityByClassificationData && (
								<DataGrid
									autoHeight
									getRowId={(row) => row.activityOrder}
									rowHeight={120}
									columns={[
										{
											field: "activityCode",
											headerName: "Code",
											maxWidth: 120,
											align: "center",
											headerAlign: "center",
										},
										{
											field: "activityName",
											headerName: "Name",
											flex: 1,
											align: "center",
											headerAlign: "center",
										},
										{
											field: "progress",
											headerName: "Progress",
											flex: 1,
											align: "center",
											headerAlign: "center",
											renderCell: (params) => {
												return (
													<TextField
														fullWidth
														sx={{ p: 1 }}
														type="number"
														label="Progress"
														placeholder="Enter progress"
													/>
												);
											},
										},
										{
											field: "comments",
											headerName: "Comments",
											flex: 1,
											align: "center",
											headerAlign: "center",
											renderCell: (params) => {
												return (
													<TextField
														rows={2}
														multiline
														fullWidth
														sx={{ p: 1 }}
														label="Comments"
														placeholder="Enter comments"
													/>
												);
											},
										},
									]}
									rows={
										activityByClassificationData as readonly ActivityByClassification[]
									}
								></DataGrid>
							)}
						</Grid>

						<Grid item lg={6} sm={6} xs={12}>
							<Button
								disabled={dataLoading}
								variant="contained"
								size="large"
								fullWidth
								sx={{ p: 1 }}
								endIcon={<SaveAlt />}
								type="submit"
							>
								Save
							</Button>
						</Grid>
						<Grid item lg={6} sm={6} xs={12}>
							<Button
								variant="outlined"
								size="large"
								fullWidth
								sx={{ p: 1 }}
								endIcon={<RestartAlt />}
								type="reset"
							>
								Reset
							</Button>
						</Grid>
					</Grid>
				</Box>
			</Grid>
		</PageContainer>
	);
};
