import {
	Box,
	Button,
	CircularProgress,
	Divider,
	Grid,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import { AxiosRequestConfig } from "axios";
import {
	AutoCompleteInput,
	AutoCompleteInputOptions,
} from "components/utilities/autoCompleteInput";
import { useAxios } from "hooks/useAxios";
import { useEffect, useMemo, useState } from "react";
import {
	URL_REPORTING_FILTER_CLASSIFICATION,
	URL_REPORTING_FILTER_PROJECT,
	URL_REPORTING_PROJECT_INSPECTION_ADD,
	URL_REPORTING_MASTER_ACTIVITY_BY_CLASSIFICATION_GET,
	URL_REPORTING_FILTER_BUILDING,
	URL_REPORTING_FILTER_OWNER,
} from "utils/constants";
import { getToken } from "utils/storage";
import { PageContainer } from "components/utilities/pageContainer";
import {
	ActivityByClassification,
	InspectionEntry as InspectionEntryInterface,
} from "@wakra-project/common";
import { RestartAlt, SaveAlt } from "@mui/icons-material";
import { useSnackbar } from "notistack";

const defaultFields = {
	project: null,
	inspectNo: null,
	documentDate: null,
	inspectionDate: null,
	classification: null,
	deliverable: null,
	owner: null,
	remarks: "",
} as InspectionEntryInterface;

export const InspectionEntry = (): JSX.Element => {
	/**
	 * States
	 */
	const [fields, setFields] = useState<InspectionEntryInterface>(defaultFields);
	const [fieldsActivities, setFieldsActivities] = useState<ActivityByClassification[]>(
		[]
	);
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
	 */
	const { data: filterProjectData, loading: filterProjectLoading } = useAxios<
		AutoCompleteInputOptions[]
	>(URL_REPORTING_FILTER_PROJECT, axiosConfigReportFilter);

	const { data: filterClassificationData, loading: filterClassificationLoading } =
		useAxios<AutoCompleteInputOptions[]>(
			URL_REPORTING_FILTER_CLASSIFICATION,
			axiosConfigReportFilter
		);

	const { data: filterBuildingData, loading: filterBuildingLoading } = useAxios<
		AutoCompleteInputOptions[]
	>(URL_REPORTING_FILTER_BUILDING, axiosConfigReportFilter);

	const { data: filterOwnerData, loading: filterOwnerLoading } = useAxios<
		AutoCompleteInputOptions[]
	>(URL_REPORTING_FILTER_OWNER, axiosConfigReportFilter);

	const { data: activityByClassificationData, loading: activityByClassificationLoading } =
		useAxios<ActivityByClassification[]>(
			URL_REPORTING_MASTER_ACTIVITY_BY_CLASSIFICATION_GET,
			axiosConfigReportFilter
		);

	useEffect(() => {
		if (activityByClassificationData) {
			setFieldsActivities(activityByClassificationData);
		}
	}, [activityByClassificationData]);

	/**
	 * API Posting
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
	 */
	const handleFormReset = (event: React.FormEvent<HTMLDivElement>): void => {
		event.preventDefault();
		setFields(defaultFields);
		setFieldsActivities([]);
	};

	const handleFormSubmit = (event: React.FormEvent<HTMLDivElement>): void => {
		event.preventDefault();

		dataPost({
			method: "POST",
			headers: {
				Authorization: `Token ${getToken()}`,
				Accept: "application/json",
				"Content-type": "application/json",
				data: JSON.stringify({
					...fields,
					documentDate: new Date(),
					inspectionDate: fields.inspectionDate ? fields.inspectionDate : new Date(),
					activities: fieldsActivities,
				} as InspectionEntryInterface),
			},
		});
	};

	const handleFormChange = (
		name: string,
		value: AutoCompleteInputOptions | string | number | null
	): void => {
		setFields((currentFields) => ({ ...currentFields, [name]: value }));
	};

	const handleFormActivitiesChange = (
		activityOrder: number,
		name: string,
		value: string | number
	): void => {
		setFieldsActivities((currentFields) => {
			const fieldsCopy = currentFields.filter(
				(field) => field.activityOrder !== activityOrder
			);
			const fieldToUpdate = currentFields.find(
				(field) => field.activityOrder === activityOrder
			) as ActivityByClassification;

			fieldToUpdate[name as keyof ActivityByClassification] = value as never;

			const returnValue: ActivityByClassification[] = [...fieldsCopy, fieldToUpdate];

			return returnValue;
		});
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
					<Grid container spacing={2} justifyContent="flex-start">
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
						<Grid item lg={3} sm={6} xs={12}>
							<AutoCompleteInput
								name="deliverable"
								label="Deliverable"
								loading={filterBuildingLoading}
								options={filterBuildingData as AutoCompleteInputOptions[]}
								value={fields?.deliverable as AutoCompleteInputOptions}
								handleChange={handleFormChange}
							/>
						</Grid>
						<Grid item lg={6} sm={6} xs={12}>
							<AutoCompleteInput
								name="owner"
								label="Owner"
								loading={filterOwnerLoading}
								options={filterOwnerData as AutoCompleteInputOptions[]}
								value={fields?.owner as AutoCompleteInputOptions}
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

						<Grid item xs={12}>
							{activityByClassificationLoading && (
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

						{activityByClassificationData &&
							activityByClassificationData.map((activity, index) => {
								return (
									<>
										<Grid
											key={activity.activityCode + index}
											item
											lg={3}
											justifyContent="center"
											alignItems="center"
										>
											<Typography variant="h6">{activity.activityName}</Typography>
										</Grid>
										<Grid key={activity.activityCode + index} item lg={1}>
											<TextField
												fullWidth
												type="number"
												name="progress"
												label="Progress"
												value={activity.progress ? activity.progress : 0}
												onChange={(e) => {
													handleFormActivitiesChange(
														activity.activityOrder as number,
														e.target.name,
														e.target.value
													);
												}}
												InputProps={{ style: { fontSize: 14 } }}
												placeholder="Enter Progress"
											/>
										</Grid>
										<Grid key={activity.activityCode + index} item lg={8}>
											<TextField
												rows={2}
												multiline
												fullWidth
												name="comments"
												label="Comments"
												InputProps={{ style: { fontSize: 14 } }}
												value={activity.comments ? activity.comments : ""}
												onChange={(e) => {
													handleFormActivitiesChange(
														activity.activityOrder as number,
														e.target.name,
														e.target.value
													);
												}}
												placeholder="Enter Comments"
											/>
										</Grid>
										<Grid component={Box} item xs={12} sx={{ p: 1 }}>
											<Divider sx={{ width: "100%" }} />
										</Grid>
									</>
								);
							})}

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
