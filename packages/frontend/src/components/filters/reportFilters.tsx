import {
	Paper,
	Grid,
	Typography,
	Divider,
	TextField,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	Box,
	FormControlLabel,
	Checkbox,
	FormLabel,
	Radio,
	RadioGroup,
	Collapse,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { useEffect, useMemo, useState } from "react";
import { FilterAlt, RestartAlt } from "@mui/icons-material";
import { useAxios } from "hooks/useAxios";
import {
	URL_REPORTING_FILTER_BUILDING,
	URL_REPORTING_FILTER_CLASSIFICATION,
	URL_REPORTING_FILTER_PHASE,
	URL_REPORTING_FILTER_PROJECT,
} from "utils/constant";
import { ReportFilter } from "types/interface";
import { getToken } from "utils/storage";
import { AxiosRequestConfig } from "axios";

type ReportFilterType = {
	date: Date | null;
	phase: string;
	classification: string;
	project: string;
	milestone: string;
	zone: string;
	section: string;
	type: string;
	owner: string;
	building: string;
	showCancelledDocs: boolean;
	sortBy: "Date" | "Building" | "Owner" | "Milestone" | "Zone";
};

interface ReportFiltersInterface {
	filter?: ReportFilterType;
}

const defaultReportFilters = (): ReportFilterType =>
	({
		date: new Date(),
		phase: "",
		classification: "",
		project: "",
		milestone: "",
		zone: "",
		section: "",
		type: "",
		owner: "",
		building: "",
		showCancelledDocs: false,
		sortBy: "Date",
	} as ReportFilterType);

export const ReportFilters = ({ filter }: ReportFiltersInterface): JSX.Element => {
	const [reportFilters, setReportFilters] = useState<ReportFilterType>(
		filter ? filter : defaultReportFilters()
	);
	const [showMore, setShowMore] = useState(false);

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

	const { data: filterPhaseData } = useAxios<ReportFilter[]>(
		URL_REPORTING_FILTER_PHASE,
		axiosConfigReportFilter
	);

	const { data: filterClassificationData } = useAxios<ReportFilter[]>(
		URL_REPORTING_FILTER_CLASSIFICATION,
		axiosConfigReportFilter
	);

	const { data: filterProjectData } = useAxios<ReportFilter[]>(
		URL_REPORTING_FILTER_PROJECT,
		axiosConfigReportFilter
	);

	const handleReportFilterDateChange = (newValue: Date | null): void => {
		setReportFilters((currentReportFilters) => ({
			...currentReportFilters,
			date: newValue,
		}));
	};

	const handleReportFilterSelectChange = (
		event: SelectChangeEvent<string>,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		_: React.ReactNode
	): void => {
		setReportFilters((currentReportFilters) => ({
			...currentReportFilters,
			[event.target.name]: event.target.value,
		}));
	};

	const handleReportFiltersReset = (): void => {
		setReportFilters(defaultReportFilters());
	};

	const handleReportFiltersApply = (): void => {
		alert(`@FILTERS ${JSON.stringify(reportFilters)}`);
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
									<FormControl required fullWidth>
										<TextField {...params} required name="date" />
									</FormControl>
								)}
							/>
						</Grid>

						<Grid item xs={12} md={3} lg={4} xl={4}>
							<FormControl fullWidth required>
								<InputLabel id="phase">Phase</InputLabel>
								<Select
									id="phase"
									name="phase"
									value={reportFilters.phase}
									label="Phase"
									onChange={handleReportFilterSelectChange}
								>
									<MenuItem key=" none" value="">
										None
									</MenuItem>
									{filterPhaseData?.map((item) => (
										<MenuItem key={`${item.id}${item.name}`} value={item.id}>
											{item.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>

						<Grid item xs={12} md={3} lg={4} xl={4}>
							<FormControl fullWidth required>
								<InputLabel id="classification">Classification</InputLabel>
								<Select
									id="classification"
									name="classification"
									value={reportFilters.classification}
									label="Classification"
									onChange={handleReportFilterSelectChange}
								>
									<MenuItem key=" none" value="">
										None
									</MenuItem>
									{filterClassificationData?.map((item) => (
										<MenuItem key={`${item.id}${item.name}`} value={item.id}>
											{item.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
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
						<Collapse in={showMore} sx={{ p: 1, display: "flex", alignItems: "center" }}>
							<Grid container item spacing={1}>
								<Grid item xs={12} md={3} lg={4} xl={4}>
									<FormControl fullWidth>
										<InputLabel id="project">Project</InputLabel>
										<Select
											id="project"
											name="project"
											value={reportFilters.project}
											label="Project"
											onChange={handleReportFilterSelectChange}
										>
											<MenuItem value="">None</MenuItem>
											<MenuItem value={10}>Ten</MenuItem>
											<MenuItem value={20}>Twenty</MenuItem>
											<MenuItem value={30}>Thirty</MenuItem>
										</Select>
									</FormControl>
								</Grid>

								<Grid item xs={12} md={3} lg={4} xl={4}>
									<FormControl fullWidth>
										<InputLabel id="milestone">Milestone</InputLabel>
										<Select
											id="milestone"
											name="milestone"
											value={reportFilters.milestone}
											label="Milestone"
											onChange={handleReportFilterSelectChange}
										>
											<MenuItem value="">None</MenuItem>
											<MenuItem value={10}>Ten</MenuItem>
											<MenuItem value={20}>Twenty</MenuItem>
											<MenuItem value={30}>Thirty</MenuItem>
										</Select>
									</FormControl>
								</Grid>
								<Grid item xs={12} md={3} lg={4} xl={4}>
									<FormControl fullWidth>
										<InputLabel id="zone">Zone</InputLabel>
										<Select
											id="zone"
											name="zone"
											value={reportFilters.zone}
											label="Zone"
											onChange={handleReportFilterSelectChange}
										>
											<MenuItem value="">None</MenuItem>
											<MenuItem value={10}>Ten</MenuItem>
											<MenuItem value={20}>Twenty</MenuItem>
											<MenuItem value={30}>Thirty</MenuItem>
										</Select>
									</FormControl>
								</Grid>
								<Grid item xs={12} md={3} lg={4} xl={4}>
									<FormControl fullWidth>
										<InputLabel id="section">Section</InputLabel>
										<Select
											id="section"
											name="section"
											value={reportFilters.section}
											label="Section"
											onChange={handleReportFilterSelectChange}
										>
											<MenuItem value="">None</MenuItem>
											<MenuItem value={10}>Ten</MenuItem>
											<MenuItem value={20}>Twenty</MenuItem>
											<MenuItem value={30}>Thirty</MenuItem>
										</Select>
									</FormControl>
								</Grid>

								<Grid item xs={12} md={3} lg={4} xl={4}>
									<FormControl fullWidth>
										<InputLabel id="type">Type</InputLabel>
										<Select
											id="type"
											name="type"
											value={reportFilters.type}
											label="Type"
											onChange={handleReportFilterSelectChange}
										>
											<MenuItem value="">None</MenuItem>
											<MenuItem value={10}>Ten</MenuItem>
											<MenuItem value={20}>Twenty</MenuItem>
											<MenuItem value={30}>Thirty</MenuItem>
										</Select>
									</FormControl>
								</Grid>
								<Grid item xs={12} md={3} lg={4} xl={4}>
									<FormControl fullWidth>
										<InputLabel id="owner">Owner</InputLabel>
										<Select
											id="owner"
											name="owner"
											value={reportFilters.owner}
											label="Owner"
											onChange={handleReportFilterSelectChange}
										>
											<MenuItem value="">None</MenuItem>
											<MenuItem value={10}>Ten</MenuItem>
											<MenuItem value={20}>Twenty</MenuItem>
											<MenuItem value={30}>Thirty</MenuItem>
										</Select>
									</FormControl>
								</Grid>
								<Grid item xs={12} md={3} lg={4} xl={4}>
									<FormControl fullWidth>
										<InputLabel id="owner">Building</InputLabel>
										<Select
											id="building"
											name="building"
											value={reportFilters.building}
											label="Building"
											onChange={handleReportFilterSelectChange}
										>
											<MenuItem value="">None</MenuItem>
											<MenuItem value={10}>Ten</MenuItem>
											<MenuItem value={20}>Twenty</MenuItem>
											<MenuItem value={30}>Thirty</MenuItem>
										</Select>
									</FormControl>
								</Grid>
							</Grid>

							<Box component="div" sx={{ p: 1 }} />
							<Divider sx={{ width: "99%" }} />
						</Collapse>
					</Grid>

					<Grid item xs={6} md={12}>
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

					<Grid item xs={6} md={12}>
						<FormControl>
							<FormLabel id="sortBy">Sort By</FormLabel>
							<RadioGroup
								row
								defaultValue={reportFilters.sortBy}
								name="radio-buttons-group"
							>
								<FormControlLabel value="Date" control={<Radio />} label="Date" />
								<FormControlLabel value="Building" control={<Radio />} label="Building" />
								<FormControlLabel value="Owner" control={<Radio />} label="Owner" />
								<FormControlLabel
									value="Milestone"
									control={<Radio />}
									label="Milestone"
								/>
								<FormControlLabel value="Zone" control={<Radio />} label="Zone" />
							</RadioGroup>
						</FormControl>
					</Grid>

					<Grid item xs={12} md={6} lg={6} xl={6} justifyContent="space-evenly">
						<Button
							variant="contained"
							size="large"
							fullWidth
							sx={{ p: 1 }}
							onClick={handleReportFiltersApply}
							endIcon={<FilterAlt />}
						>
							Apply
						</Button>
					</Grid>

					<Grid item xs={12} md={6} lg={6} xl={6} justifyContent="space-evenly">
						<Button
							variant="outlined"
							size="large"
							fullWidth
							sx={{ p: 1 }}
							onClick={handleReportFiltersReset}
							endIcon={<RestartAlt />}
						>
							Reset Filters
						</Button>
					</Grid>
				</Grid>
			</Paper>
		</LocalizationProvider>
	);
};
