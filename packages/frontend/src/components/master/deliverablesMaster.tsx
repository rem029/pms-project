import { Box, Button, Divider, Grid, Paper, TextField, Typography } from "@mui/material";
import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import { AutoCompleteInputOptions } from "components/utilities/autoCompleteInput";
import { useAxios } from "hooks/useAxios";
import { useMemo, useState } from "react";
import {
	URL_REPORTING_FILTER_CONSTRUCTION,
	URL_REPORTING_FILTER_MILESTONE,
	URL_REPORTING_FILTER_OWNER,
	URL_REPORTING_FILTER_PROJECT,
	URL_REPORTING_FILTER_SECTION,
	URL_REPORTING_FILTER_TYPE,
	URL_REPORTING_FILTER_ZONE,
	URL_REPORTING_MASTER_DETAILED,
} from "utils/constants";
import { getToken } from "utils/storage";
import { AutoCompleteInput } from "..";
import { PageContainer } from "../utilities/pageContainer";
import { DeliverablesMaster as DeliverablesMasterInterface } from "@wakra-project/common";
import { RestartAlt, SaveAlt } from "@mui/icons-material";

const defaultFields = {
	date: null,
	code: null,
	name: null,
	units: null,
	modules: null,
	phase: null,
	classification: null,
	construction: null,
	project: null,
	milestone: null,
	zone: null,
	section: null,
	type: null,
	owner: null,
	building: null,
	showCancelledDocs: false,
} as DeliverablesMasterInterface;

export const DeliverablesMaster = (): JSX.Element => {
	/**
	 * States
	 */
	const [fields, setFields] = useState<DeliverablesMasterInterface>(defaultFields);

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

	const { data: filterSectionData, loading: filterSectionLoading } = useAxios<
		AutoCompleteInputOptions[]
	>(URL_REPORTING_FILTER_SECTION, axiosConfigReportFilter);

	const { data: filterTypeData, loading: filterTypeLoading } = useAxios<
		AutoCompleteInputOptions[]
	>(URL_REPORTING_FILTER_TYPE, axiosConfigReportFilter);

	const { data: filterOwnerData, loading: filterOwnerLoading } = useAxios<
		AutoCompleteInputOptions[]
	>(URL_REPORTING_FILTER_OWNER, axiosConfigReportFilter);

	const { data: filterMilestoneData, loading: filterMilestoneLoading } = useAxios<
		AutoCompleteInputOptions[]
	>(URL_REPORTING_FILTER_MILESTONE, axiosConfigReportFilter);

	const { data: filterZoneData, loading: filterZoneLoading } = useAxios<
		AutoCompleteInputOptions[]
	>(URL_REPORTING_FILTER_ZONE, axiosConfigReportFilter);

	const { data: filterConstructionData, loading: filterConstructionLoading } = useAxios<
		AutoCompleteInputOptions[]
	>(URL_REPORTING_FILTER_CONSTRUCTION, axiosConfigReportFilter);

	/**
	 * API Posting
	 */
	const {
		error: addDeliverablesError,
		message: addDeliverablesMessage,
		loading: addDeliverablesLoading,
		fetch: addDeliverablesPost,
	} = useAxios<AutoCompleteInputOptions[]>(URL_REPORTING_MASTER_DETAILED);

	/**
	 * Event Handlers
	 */
	const handleFormReset = (event: React.FormEvent<HTMLDivElement>): void => {
		event.preventDefault();
		setFields(defaultFields);
	};

	const handleFormSubmit = (event: React.FormEvent<HTMLDivElement>): void => {
		event.preventDefault();

		addDeliverablesPost({
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
		<PageContainer title="Deliverables Master">
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
								name="units"
								label="Units"
								value={fields.units || ""}
								placeholder="Enter entry units"
								type="number"
								onChange={(e) =>
									handleFormChange(e.target.name, e.target.value as string)
								}
							/>
						</Grid>
						<Grid item lg={3} sm={6} xs={12}>
							<TextField
								fullWidth
								name="modules"
								label="Modules"
								value={fields.modules || ""}
								placeholder="Enter entry modules"
								type="number"
								onChange={(e) =>
									handleFormChange(e.target.name, e.target.value as string)
								}
							/>
						</Grid>

						<Grid component={Box} item xs={12} sx={{ p: 1 }}>
							<Divider sx={{ width: "100%" }} />
						</Grid>

						<Grid item lg={6} sm={6} xs={12}>
							<AutoCompleteInput
								name="section"
								label="Section"
								loading={filterSectionLoading}
								options={filterSectionData as AutoCompleteInputOptions[]}
								value={fields?.section as AutoCompleteInputOptions}
								handleChange={handleFormChange}
							/>
						</Grid>

						<Grid item lg={6} sm={6} xs={12}>
							<AutoCompleteInput
								name="type"
								label="Type"
								loading={filterTypeLoading}
								options={filterTypeData as AutoCompleteInputOptions[]}
								value={fields?.type as AutoCompleteInputOptions}
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

						<Grid item lg={6} sm={6} xs={12}>
							<AutoCompleteInput
								name="milestone"
								label="Milestone"
								loading={filterMilestoneLoading}
								options={filterMilestoneData as AutoCompleteInputOptions[]}
								value={fields?.milestone as AutoCompleteInputOptions}
								handleChange={handleFormChange}
							/>
						</Grid>

						<Grid item lg={6} sm={6} xs={12}>
							<AutoCompleteInput
								name="zone"
								label="Zone"
								loading={filterZoneLoading}
								options={filterZoneData as AutoCompleteInputOptions[]}
								value={fields?.zone as AutoCompleteInputOptions}
								handleChange={handleFormChange}
							/>
						</Grid>

						<Grid item lg={6} sm={6} xs={12}>
							<AutoCompleteInput
								name="construction"
								label="Construction"
								loading={filterConstructionLoading}
								options={filterConstructionData as AutoCompleteInputOptions[]}
								value={fields?.construction as AutoCompleteInputOptions}
								handleChange={handleFormChange}
							/>
						</Grid>

						<Grid component={Box} item xs={12} sx={{ p: 1 }}>
							<Divider sx={{ width: "100%" }} />
						</Grid>

						<Grid item lg={6} sm={6} xs={12}>
							<Button
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
