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
	Autocomplete,
	CircularProgress,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { useEffect, useMemo, useRef, useState } from "react";
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
} from "utils/constant";
import { ReportFilterType, ReportFilter } from "types";
import { getToken } from "utils/storage";
import { AxiosRequestConfig } from "axios";

// const defaultItem: ReportFilter = { id: "-1", name: " " };

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
};

interface ReportFiltersInterface {
	filter?: ReportFilterType;
	onSubmit?: (filter: ReportFilterType) => void;
}

export const ReportFilters = ({
	filter,
	onSubmit,
}: ReportFiltersInterface): JSX.Element => {
	const [reportFilters, setReportFilters] = useState<ReportFilterType>(
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

	useEffect(() => {
		console.log("@reportFilters", reportFilters);
	}, [reportFilters]);

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

	const getListItems = (data?: ReportFilter[]): readonly ReportFilter[] => {
		const items: readonly ReportFilter[] = data ? [...data] : [];
		return items;
	};

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
							<Grid item xs={12} md={3} lg={4} xl={4}>
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

							<Grid item xs={12} md={3} lg={4} xl={4}>
								<Autocomplete
									disablePortal
									options={getListItems(filterPhaseData)}
									getOptionLabel={(option) => option.name}
									loading
									inputValue={filter?.phase?.name}
									onChange={(_, value) => {
										handleReportFilterAutoCompleteChange("phase", value);
									}}
									renderInput={(params) => (
										<TextField
											{...params}
											name="phase"
											label="Phase"
											fullWidth
											InputProps={{
												...params.InputProps,
												endAdornment: (
													<>
														{filterPhaseLoading ? (
															<CircularProgress color="inherit" size={20} />
														) : null}
														{params.InputProps.endAdornment}
													</>
												),
											}}
										/>
									)}
								/>
							</Grid>

							<Grid item xs={12} md={3} lg={4} xl={4}>
								<Autocomplete
									disablePortal
									options={getListItems(filterClassificationData)}
									getOptionLabel={(option) => option.name}
									loading
									onChange={(_, value) => {
										handleReportFilterAutoCompleteChange("classification", value);
									}}
									renderInput={(params) => (
										<TextField
											{...params}
											name="classification"
											label="Classification"
											fullWidth
											InputProps={{
												...params.InputProps,
												endAdornment: (
													<>
														{filterClassificationLoading ? (
															<CircularProgress color="inherit" size={20} />
														) : null}
														{params.InputProps.endAdornment}
													</>
												),
											}}
										/>
									)}
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
										<Autocomplete
											disablePortal
											options={getListItems(filterProjectData)}
											getOptionLabel={(option) => option.name}
											loading
											onChange={(_, value) => {
												handleReportFilterAutoCompleteChange("project", value);
											}}
											renderInput={(params) => (
												<TextField
													{...params}
													name="project"
													label="Project"
													fullWidth
													InputProps={{
														...params.InputProps,
														endAdornment: (
															<>
																{filterProjectLoading ? (
																	<CircularProgress color="inherit" size={20} />
																) : null}
																{params.InputProps.endAdornment}
															</>
														),
													}}
												/>
											)}
										/>
									</Grid>

									<Grid item xs={12} md={3} lg={4} xl={4}>
										<Autocomplete
											disablePortal
											options={getListItems(filterMilestoneData)}
											getOptionLabel={(option) => option.name}
											loading
											onChange={(_, value) => {
												handleReportFilterAutoCompleteChange("milestone", value);
											}}
											renderInput={(params) => (
												<TextField
													{...params}
													name="milestone"
													label="Milestone"
													fullWidth
													InputProps={{
														...params.InputProps,
														endAdornment: (
															<>
																{filterMilestoneLoading ? (
																	<CircularProgress color="inherit" size={20} />
																) : null}
																{params.InputProps.endAdornment}
															</>
														),
													}}
												/>
											)}
										/>
									</Grid>
									<Grid item xs={12} md={3} lg={4} xl={4}>
										<Autocomplete
											disablePortal
											options={getListItems(filterZoneData)}
											getOptionLabel={(option) => option.name}
											loading
											onChange={(_, value) => {
												handleReportFilterAutoCompleteChange("zone", value);
											}}
											renderInput={(params) => (
												<TextField
													{...params}
													name="zone"
													label="Zone"
													fullWidth
													InputProps={{
														...params.InputProps,
														endAdornment: (
															<>
																{filterZoneLoading ? (
																	<CircularProgress color="inherit" size={20} />
																) : null}
																{params.InputProps.endAdornment}
															</>
														),
													}}
												/>
											)}
										/>
									</Grid>
									<Grid item xs={12} md={3} lg={4} xl={4}>
										<Autocomplete
											disablePortal
											options={getListItems(filterSectionData)}
											getOptionLabel={(option) => option.name}
											loading
											onChange={(_, value) => {
												handleReportFilterAutoCompleteChange("section", value);
											}}
											renderInput={(params) => (
												<TextField
													{...params}
													name="section"
													label="Section"
													fullWidth
													InputProps={{
														...params.InputProps,
														endAdornment: (
															<>
																{filterSectionLoading ? (
																	<CircularProgress color="inherit" size={20} />
																) : null}
																{params.InputProps.endAdornment}
															</>
														),
													}}
												/>
											)}
										/>
									</Grid>

									<Grid item xs={12} md={3} lg={4} xl={4}>
										<Autocomplete
											disablePortal
											options={getListItems(filterTypeData)}
											getOptionLabel={(option) => option.name}
											loading
											onChange={(_, value) => {
												handleReportFilterAutoCompleteChange("type", value);
											}}
											renderInput={(params) => (
												<TextField
													{...params}
													name="type"
													label="Type"
													fullWidth
													InputProps={{
														...params.InputProps,
														endAdornment: (
															<>
																{filterTypeLoading ? (
																	<CircularProgress color="inherit" size={20} />
																) : null}
																{params.InputProps.endAdornment}
															</>
														),
													}}
												/>
											)}
										/>
									</Grid>
									<Grid item xs={12} md={3} lg={4} xl={4}>
										<Autocomplete
											disablePortal
											options={getListItems(filterOwnerData)}
											getOptionLabel={(option) => option.name}
											loading
											onChange={(_, value) => {
												handleReportFilterAutoCompleteChange("owner", value);
											}}
											renderInput={(params) => (
												<TextField
													{...params}
													name="owner"
													label="Owner"
													fullWidth
													InputProps={{
														...params.InputProps,
														endAdornment: (
															<>
																{filterOwnerLoading ? (
																	<CircularProgress color="inherit" size={20} />
																) : null}
																{params.InputProps.endAdornment}
															</>
														),
													}}
												/>
											)}
										/>
									</Grid>
									<Grid item xs={12} md={3} lg={4} xl={4}>
										<Autocomplete
											disablePortal
											options={getListItems(filterBuildingData)}
											getOptionLabel={(option) => option.name}
											loading
											onChange={(_, value) => {
												handleReportFilterAutoCompleteChange("building", value);
											}}
											renderInput={(params) => (
												<TextField
													{...params}
													name="building"
													label="Building"
													fullWidth
													InputProps={{
														...params.InputProps,
														endAdornment: (
															<>
																{filterBuildingLoading ? (
																	<CircularProgress color="inherit" size={20} />
																) : null}
																{params.InputProps.endAdornment}
															</>
														),
													}}
												/>
											)}
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

						{/* <Grid item xs={6} md={12}>
							<FormControl>
								<FormLabel id="sortBy">Sort By</FormLabel>
								<RadioGroup
									row
									defaultValue={reportFilters.sortBy}
									name="radio-buttons-group"
								>
									<FormControlLabel value="Date" control={<Radio />} label="Date" />
									<FormControlLabel
										value="Building"
										control={<Radio />}
										label="Building"
									/>
									<FormControlLabel value="Owner" control={<Radio />} label="Owner" />
									<FormControlLabel
										value="Milestone"
										control={<Radio />}
										label="Milestone"
									/>
									<FormControlLabel value="Zone" control={<Radio />} label="Zone" />
								</RadioGroup>
							</FormControl>
						</Grid> */}

						<Grid item xs={12} md={6} lg={6} xl={6} justifyContent="space-evenly">
							<Button
								variant="contained"
								size="large"
								fullWidth
								sx={{ p: 1 }}
								endIcon={<FilterAlt />}
								type="submit"
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
