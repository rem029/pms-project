import { Box, Button, Divider, Grid, Paper, TextField, Typography } from "@mui/material";
import { AxiosRequestConfig } from "axios";
import { AutoCompleteInputOptions } from "components/utilities/autoCompleteInput";
import { useAxios } from "hooks/useAxios";
import { useEffect, useMemo, useState } from "react";
import {
	URL_REPORTING_FILTER_CLASSIFICATION,
	URL_REPORTING_FILTER_PHASE,
	URL_REPORTING_FILTER_PROJECT,
	URL_REPORTING_MASTER_ACTIVITY,
} from "utils/constants";
import { getToken } from "utils/storage";
import { AutoCompleteInput } from "..";
import { PageContainer } from "../utilities/pageContainer";
import { ActivityMaster as ActivityMasterInterface } from "@wakra-project/common";
import { RestartAlt, SaveAlt } from "@mui/icons-material";
import { useSnackbar } from "notistack";

const defaultFields = {
	phase: null,
	classification: null,
	project: null,
	date: null,
	code: null,
	name: null,
	activityOrder: null,
} as ActivityMasterInterface;

export const ActivityMaster = (): JSX.Element => {
	/**
	 * States
	 *
	 *
	 */
	const [fields, setFields] = useState<ActivityMasterInterface>(defaultFields);
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

	const { data: filterPhaseData, loading: filterPhaseDataLoading } = useAxios<
		AutoCompleteInputOptions[]
	>(URL_REPORTING_FILTER_PHASE, axiosConfigReportFilter);

	const { data: filterClassificationData, loading: filterClassificationLoading } =
		useAxios<AutoCompleteInputOptions[]>(
			URL_REPORTING_FILTER_CLASSIFICATION,
			axiosConfigReportFilter
		);

	/**
	 * API Posting
	 *
	 *
	 */
	const {
		fetch: addActivityPost,
		loading: addActivityPostLoading,
		message: addActivityPostMessage,
		success: addActivityPostSuccess,
	} = useAxios<AutoCompleteInputOptions[]>(URL_REPORTING_MASTER_ACTIVITY);

	useEffect(() => {
		if (addActivityPostMessage) {
			enqueueSnackbar(addActivityPostMessage, {
				variant: addActivityPostSuccess ? "info" : "error",
			});
		}
	}, [addActivityPostSuccess]);

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

		addActivityPost({
			method: "POST",
			headers: {
				Authorization: `Token ${getToken()}`,
				Accept: "application/json",
				"Content-type": "application/json",
				data: JSON.stringify({ ...fields, date: new Date() }),
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
		<PageContainer title="Activity Master">
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
						<Grid item xs={12}>
							<Typography variant="h6" padding={1}>
								New Entry
							</Typography>
						</Grid>

						<Grid item lg={3} sm={12} xs={12}>
							<AutoCompleteInput
								name="project"
								label="Project"
								loading={filterProjectLoading}
								options={filterProjectData as AutoCompleteInputOptions[]}
								value={fields?.project as AutoCompleteInputOptions}
								handleChange={handleFormChange}
							/>
						</Grid>
						<Grid item lg={9} sm={12} xs={12} />

						<Grid item lg={3} sm={12} xs={12}>
							<TextField
								fullWidth
								name="code"
								label="Code#"
								value={fields.code || ""}
								placeholder="Enter entry code#"
								onChange={(e) =>
									handleFormChange(e.target.name, e.target.value as string)
								}
							/>
						</Grid>

						<Grid item lg={9} sm={12} xs={12}>
							<TextField
								fullWidth
								name="name"
								label="Name"
								value={fields.name || ""}
								placeholder="Enter entry name"
								multiline
								onChange={(e) =>
									handleFormChange(e.target.name, e.target.value as string)
								}
							/>
						</Grid>

						<Grid component={Box} item xs={12} sx={{ p: 1 }}>
							<Divider sx={{ width: "100%" }} />
						</Grid>

						<Grid item lg={3} sm={6} xs={12}>
							<TextField
								fullWidth
								name="activityOrder"
								label="Activity Order"
								value={fields.activityOrder || ""}
								placeholder="Enter activity order"
								type="number"
								onChange={(e) =>
									handleFormChange(e.target.name, e.target.value as string)
								}
							/>
						</Grid>

						<Grid item xs={6}></Grid>

						<Grid item lg={6} sm={6} xs={12}>
							<AutoCompleteInput
								name="phase"
								label="Phase"
								loading={filterPhaseDataLoading}
								options={filterPhaseData as AutoCompleteInputOptions[]}
								value={fields?.phase as AutoCompleteInputOptions}
								handleChange={handleFormChange}
							/>
						</Grid>

						<Grid item lg={6} sm={6} xs={12}>
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

						<Grid item lg={6} sm={6} xs={12}>
							<Button
								disabled={addActivityPostLoading}
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
