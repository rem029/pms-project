import {
	Paper,
	Grid,
	Typography,
	Divider,
	TextField,
	Button,
	Box,
	FormControlLabel,
	Checkbox,
	Collapse,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { useMemo, useRef, useState } from "react";
import { FilterAlt, RestartAlt } from "@mui/icons-material";
import { useAxios } from "hooks/useAxios";
import {
	URL_REPORTING_FILTER_BUILDING,
	URL_REPORTING_FILTER_CLASSIFICATION,
	URL_REPORTING_FILTER_MILESTONE,
	URL_REPORTING_FILTER_OWNER,
	URL_REPORTING_FILTER_PHASE,
	URL_REPORTING_FILTER_PROJECT,
	URL_REPORTING_FILTER_SECTION,
	URL_REPORTING_FILTER_TYPE,
	URL_REPORTING_FILTER_ZONE,
} from "utils/constants";
import { ReportFilters as ReportFilterFields, ReportFilter } from "@wakra-project/common";
import { getToken } from "utils/storage";
import { AxiosRequestConfig } from "axios";
import { AutoCompleteInput } from "components";
import { AutoCompleteInputOptions } from "components/utilities/autoCompleteInput";

const defaultReportFilters = {
	date: null,
	phase: null,
	classification: null,
	project: null,
	milestone: null,
	zone: null,
	section: null,
	type: null,
	owner: null,
	building: null,
	showCancelledDocs: false,
} as ReportFilterFields;

interface ReportFiltersInterface {
	filter?: ReportFilterFields;
	onSubmit?: (filter: ReportFilterFields) => void;
	disableButtonApply?: boolean;
}

export const ReportFilters = ({
	filter,
	onSubmit,
	disableButtonApply,
}: ReportFiltersInterface): JSX.Element => {
	const [reportFilters, setReportFilters] = useState<ReportFilterFields>(
		filter ? filter : defaultReportFilters
	);
	const [showMore, setShowMore] = useState(false);
	const refResetButton = useRef<HTMLButtonElement>(null);

	const axiosConfigReportFilter: AxiosRequestConfig = useMemo(() => {
		return {
			method: "GET",
			headers: {
				Authorization: `Token ${getToken()}`,
			},
		};
	}, []);

	const { data: filterPhaseData, loading: filterPhaseLoading } = useAxios<ReportFilter[]>(
		URL_REPORTING_FILTER_PHASE,
		axiosConfigReportFilter
	);

	const { data: filterClassificationData, loading: filterClassificationLoading } =
		useAxios<ReportFilter[]>(
			URL_REPORTING_FILTER_CLASSIFICATION,
			axiosConfigReportFilter
		);

	const { data: filterProjectData, loading: filterProjectLoading } = useAxios<
		ReportFilter[]
	>(URL_REPORTING_FILTER_PROJECT, axiosConfigReportFilter);

	const { data: filterMilestoneData, loading: filterMilestoneLoading } = useAxios<
		ReportFilter[]
	>(URL_REPORTING_FILTER_MILESTONE, axiosConfigReportFilter);

	const { data: filterZoneData, loading: filterZoneLoading } = useAxios<ReportFilter[]>(
		URL_REPORTING_FILTER_ZONE,
		axiosConfigReportFilter
	);

	const { data: filterSectionData, loading: filterSectionLoading } = useAxios<
		ReportFilter[]
	>(URL_REPORTING_FILTER_SECTION, axiosConfigReportFilter);

	const { data: filterTypeData, loading: filterTypeLoading } = useAxios<ReportFilter[]>(
		URL_REPORTING_FILTER_TYPE,
		axiosConfigReportFilter
	);

	const { data: filterOwnerData, loading: filterOwnerLoading } = useAxios<ReportFilter[]>(
		URL_REPORTING_FILTER_OWNER,
		axiosConfigReportFilter
	);

	const { data: filterBuildingData, loading: filterBuildingLoading } = useAxios<
		ReportFilter[]
	>(URL_REPORTING_FILTER_BUILDING, axiosConfigReportFilter);

	const handleReportFilterDateChange = (newValue: Date | null): void => {
		setReportFilters((currentReportFilters) => ({
			...currentReportFilters,
			date: newValue,
		}));
	};

	const handleReportFilterAutoCompleteChange = (
		name: string,
		value: ReportFilter | null
	): void => {
		setReportFilters((currentReportFilters) => ({
			...currentReportFilters,
			[name]: value,
		}));
	};

	const handleReportFiltersReset = (event: React.FormEvent<HTMLDivElement>): void => {
		event.preventDefault();

		const clearButtons = document.getElementsByClassName(
			"MuiAutocomplete-clearIndicator"
		);

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		for (const clearButton of clearButtons as any) {
			(clearButton as HTMLElement).click();
		}

		refResetButton.current?.focus();

		setReportFilters(defaultReportFilters);
	};

	const handleReportFiltersApply = (event: React.FormEvent<HTMLDivElement>): void => {
		event.preventDefault();
		onSubmit && onSubmit(reportFilters);
	};

	const handleReportFilterCheckChange = (
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		_: React.ChangeEvent<HTMLInputElement>,
		checked: boolean
	): void => {
		setReportFilters((currentReportFilters) => ({
			...currentReportFilters,
			showCancelledDocs: checked,
		}));
	};

	const handleShowMoreChange = (): void => {
		setShowMore((currentShowMore) => !currentShowMore);
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<Paper sx={{ flexGrow: 1, padding: 1, mt: 0.5 }} elevation={3}>
				<Box
					component="form"
					onReset={handleReportFiltersReset}
					onSubmit={handleReportFiltersApply}
				>
					<Grid container spacing={1} justifyContent="center">
						<Grid item xs={12}>
							<Typography
								color="text.secondary"
								variant="button"
								noWrap
								component="p"
								align="left"
								sx={{ display: "flex", alignItems: "center", p: 1 }}
							>
								<FilterAlt />
								Filter by
							</Typography>
						</Grid>

						<Divider sx={{ width: "99%" }} />

						<Grid container item spacing={1}>
							<Grid item xs={12} md={4} lg={4} xl={4}>
								<DatePicker
									disableFuture
									label="Date"
									value={reportFilters.date}
									onChange={handleReportFilterDateChange}
									openTo="day"
									views={["year", "month", "day"]}
									renderInput={(params) => (
										<TextField {...params} fullWidth name="date" />
									)}
								/>
							</Grid>

							<Grid item xs={12} md={4} lg={4} xl={4}>
								<AutoCompleteInput
									name="phase"
									label="Phase"
									loading={filterPhaseLoading}
									options={filterPhaseData as AutoCompleteInputOptions[]}
									value={filter?.phase as AutoCompleteInputOptions}
									handleChange={handleReportFilterAutoCompleteChange}
								/>
							</Grid>

							<Grid item xs={12} md={4} lg={4} xl={4}>
								<AutoCompleteInput
									name="classification"
									label="Classification"
									loading={filterClassificationLoading}
									options={filterClassificationData as AutoCompleteInputOptions[]}
									value={filter?.classification as AutoCompleteInputOptions}
									handleChange={handleReportFilterAutoCompleteChange}
								/>
							</Grid>

							<Grid item xs={12}>
								<Button
									fullWidth
									size="small"
									endIcon={showMore ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
									onClick={handleShowMoreChange}
								>
									Show more filters
								</Button>
							</Grid>
						</Grid>

						<Box component="div" sx={{ p: 1 }} />
						<Divider sx={{ width: "99%" }} />

						<Grid item xs={12}>
							<Collapse
								in={showMore}
								sx={{ p: 1, display: "flex", alignItems: "center" }}
							>
								<Grid container item spacing={1}>
									<Grid item xs={12} md={3} lg={4} xl={4}>
										<AutoCompleteInput
											name="project"
											label="Project"
											loading={filterProjectLoading}
											options={filterProjectData as AutoCompleteInputOptions[]}
											value={filter?.project as AutoCompleteInputOptions}
											handleChange={handleReportFilterAutoCompleteChange}
										/>
									</Grid>

									<Grid item xs={12} md={3} lg={4} xl={4}>
										<AutoCompleteInput
											name="milestone"
											label="Milestone"
											loading={filterMilestoneLoading}
											options={filterMilestoneData as AutoCompleteInputOptions[]}
											value={filter?.milestone as AutoCompleteInputOptions}
											handleChange={handleReportFilterAutoCompleteChange}
										/>
									</Grid>
									<Grid item xs={12} md={3} lg={4} xl={4}>
										<AutoCompleteInput
											name="zone"
											label="Zone"
											loading={filterZoneLoading}
											options={filterZoneData as AutoCompleteInputOptions[]}
											value={filter?.zone as AutoCompleteInputOptions}
											handleChange={handleReportFilterAutoCompleteChange}
										/>
									</Grid>
									<Grid item xs={12} md={3} lg={4} xl={4}>
										<AutoCompleteInput
											name="section"
											label="Section"
											loading={filterSectionLoading}
											options={filterSectionData as AutoCompleteInputOptions[]}
											value={filter?.section as AutoCompleteInputOptions}
											handleChange={handleReportFilterAutoCompleteChange}
										/>
									</Grid>

									<Grid item xs={12} md={3} lg={4} xl={4}>
										<AutoCompleteInput
											name="type"
											label="Type"
											loading={filterTypeLoading}
											options={filterTypeData as AutoCompleteInputOptions[]}
											value={filter?.type as AutoCompleteInputOptions}
											handleChange={handleReportFilterAutoCompleteChange}
										/>
									</Grid>
									<Grid item xs={12} md={3} lg={4} xl={4}>
										<AutoCompleteInput
											name="owner"
											label="Owner"
											loading={filterOwnerLoading}
											options={filterOwnerData as AutoCompleteInputOptions[]}
											value={filter?.owner as AutoCompleteInputOptions}
											handleChange={handleReportFilterAutoCompleteChange}
										/>
									</Grid>
									<Grid item xs={12} md={3} lg={4} xl={4}>
										<AutoCompleteInput
											name="building"
											label="Building"
											loading={filterBuildingLoading}
											options={filterBuildingData as AutoCompleteInputOptions[]}
											value={filter?.building as AutoCompleteInputOptions}
											handleChange={handleReportFilterAutoCompleteChange}
										/>
									</Grid>
								</Grid>

								<Box component="div" sx={{ p: 1 }} />
								<Divider sx={{ width: "99%" }} />
							</Collapse>
						</Grid>

						<Grid item xs={12}>
							<FormControlLabel
								control={
									<Checkbox
										onChange={handleReportFilterCheckChange}
										checked={reportFilters.showCancelledDocs}
									/>
								}
								label="Show cancelled documents?"
							/>
						</Grid>

						<Grid item xs={12} md={6} lg={6} xl={6} justifyContent="space-evenly">
							<Button
								variant="contained"
								size="large"
								fullWidth
								sx={{ p: 1 }}
								endIcon={<FilterAlt />}
								type="submit"
								disabled={disableButtonApply}
							>
								Apply
							</Button>
						</Grid>

						<Grid item xs={12} md={6} lg={6} xl={6} justifyContent="space-evenly">
							<Button
								ref={refResetButton}
								variant="outlined"
								size="large"
								fullWidth
								sx={{ p: 1 }}
								endIcon={<RestartAlt />}
								type="reset"
							>
								Reset Filters
							</Button>
						</Grid>
					</Grid>
				</Box>
			</Paper>
		</LocalizationProvider>
	);
};
