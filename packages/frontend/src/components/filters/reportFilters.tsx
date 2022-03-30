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
} from "@mui/material";
import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { useEffect, useState } from "react";
import { FilterAlt, RestartAlt } from "@mui/icons-material";

//Date						DatePicker *
//Phase						Dropdown *
//Classification			Dropdown *
//Project					Dropdown
//Milestone					Dropdown
//Zone						Dropdown
//Section					Dropdown
//Type						Dropdown
//Owner						Dropdown
//Building 					Dropdown
//Show cancelled documents 	Checkbox
//Sort By 					Radio
//		Date
//		Building
//		Owner
//		Milestone
//		Zone

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
	sortBy: string;
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
		sortBy: "",
	} as ReportFilterType);

export const ReportFilters = ({ filter }: ReportFiltersInterface): JSX.Element => {
	const [reportFilters, setReportFilters] = useState<ReportFilterType>(
		filter ? filter : defaultReportFilters()
	);

	useEffect(() => {
		console.log("@reportFilters", reportFilters);
	}, [reportFilters]);

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
						<Grid item xs={12}>
							<DatePicker
								disableFuture
								label="Date"
								value={reportFilters.date}
								onChange={handleReportFilterDateChange}
								openTo="day"
								views={["year", "month", "day"]}
								renderInput={(params) => (
									<FormControl required>
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
									<MenuItem value="">None</MenuItem>
									<MenuItem value={10}>Ten</MenuItem>
									<MenuItem value={20}>Twenty</MenuItem>
									<MenuItem value={30}>Thirty</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={12} md={3} lg={4} xl={4}>
							<FormControl fullWidth required>
								<InputLabel id="classification">Classification</InputLabel>
								<Select
									id="classification"
									name="phase"
									value={reportFilters.classification}
									label="Classification"
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
								<FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
								<RadioGroup
									row
									aria-labelledby="demo-radio-buttons-group-label"
									defaultValue="female"
									name="radio-buttons-group"
								>
									<FormControlLabel value="female" control={<Radio />} label="Female" />
									<FormControlLabel value="male" control={<Radio />} label="Male" />
									<FormControlLabel value="other" control={<Radio />} label="Other" />
								</RadioGroup>
							</FormControl>
						</Grid>
					</Grid>

					<Box component="div" sx={{ p: 1 }} />
					<Divider sx={{ width: "99%" }} />

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
