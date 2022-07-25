import { useState, useEffect, useRef, useMemo } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Paper from "@mui/material/Paper";

import {
	TABLE_HEADER_REPORTING_SUMMARY_PROGRESS,
	TABLE_HEADER_REPORTING_SUMMARY_PROGRESS_ACTIVITY_CONSTRUCTION,
	TABLE_HEADER_REPORTING_SUMMARY_PROGRESS_ACTIVITY_TNC,
} from "utils/constants";

import {
	ReportProgressSummaryConstruction,
	ReportProgressSummaryTestingCommissioning,
} from "@pms-project/common";

import {
	Button,
	Chip,
	CircularProgress,
	Grid,
	TablePagination,
	TableSortLabel,
	Typography,
} from "@mui/material";
import { blue, green, grey, orange, red, yellow } from "@mui/material/colors";

import { getCSSDocument, getCSSReportColor } from "helpers/cssHelper";
import { dateHelperFormat } from "helpers/dateHelper";
import { Preview } from "@mui/icons-material";
import { ReportingPrintPreviewModal } from "components/utilities/reportingPrintPreviewModal";
import { TablePaginationActions } from "components/utilities/tablePaginationActions";
import { TableOrderBy, sortTableHelper } from "helpers/tableHelper";

const tableMaxHeight = 720;

interface ReportingTableProps {
	data?:
		| ReportProgressSummaryConstruction[]
		| ReportProgressSummaryTestingCommissioning[];
	success: boolean;
	message: string;
	loading: boolean;
	classificationName: string;
	phaseName: string;
}

export const ReportingSummaryProgressTable = ({
	data,
	success,
	message,
	loading,
	classificationName,
	phaseName,
}: ReportingTableProps): JSX.Element => {
	const [report, setReport] = useState<
		ReportProgressSummaryConstruction[] | ReportProgressSummaryTestingCommissioning[]
	>([]);
	const [reportHTMLCSSString, setReportHTMLCSSString] = useState("");
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [isModalExportOpen, setIsModalExportOpen] = useState(false);
	const [sort, setSort] = useState<{
		key:
			| keyof ReportProgressSummaryConstruction
			| keyof ReportProgressSummaryTestingCommissioning;
		order: TableOrderBy;
	}>({ key: "inspectionDate", order: "desc" });

	const tableRef = useRef<HTMLDivElement>(null);

	const reportSorted = useMemo(() => {
		if (report.length > 0) {
			return [...report].sort((compareReportA, compareReportB) => {
				const { key, order } = sort;
				if (compareReportA.__typename === "ReportProgressSummaryConstruction") {
					return sortTableHelper(
						compareReportA,
						compareReportB as ReportProgressSummaryConstruction,
						{
							key: key as keyof ReportProgressSummaryConstruction,
							order: order,
						}
					);
				}
				if (compareReportA.__typename === "ReportProgressSummaryTestingCommissioning") {
					return sortTableHelper(
						compareReportA,
						compareReportB as ReportProgressSummaryTestingCommissioning,
						{
							key: key as keyof ReportProgressSummaryTestingCommissioning,
							order: order,
						}
					);
				}

				return 0;
			});
		}

		return [] as
			| ReportProgressSummaryConstruction[]
			| ReportProgressSummaryTestingCommissioning[];
	}, [report, sort]);

	// const reportSortedCSV = useMemo(() => {
	// 	let csvData = "";
	// 	if (reportSorted.length > 0)
	// 		csvData = parse(reportSorted, {
	// 			fields: ["insNo", "insDate", "bldgCode", "ownerName"],
	// 		});
	// 	console.log("@reportSortedCSV", csvData);
	// 	return csvData;
	// }, [reportSorted]);

	useEffect(() => {
		if (!loading && success && data) {
			setReport(data);
		} else setReport([]);
	}, [data, success, loading]);

	const handleChangePage = (
		_: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number
	): void => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	): void => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleButtonExportClick = (): void => {
		setReportHTMLCSSString(
			`<style>${getCSSDocument()}</style> ${tableRef.current?.innerHTML}`
		);
		setIsModalExportOpen(true);
	};

	const handleHeaderSort = (
		headerName:
			| keyof ReportProgressSummaryConstruction
			| keyof ReportProgressSummaryTestingCommissioning
	): void => {
		setSort((currentSort) => ({
			key: headerName,
			order: currentSort.order === "asc" ? "desc" : "asc",
		}));
	};

	const handleModalClose = (): void => {
		setIsModalExportOpen(false);
	};

	return (
		<>
			<Grid container>
				<Grid item xs={3}>
					<Button
						onClick={handleButtonExportClick}
						endIcon={<Preview />}
						disabled={report.length <= 0}
						fullWidth
					>
						Print Preview
					</Button>
				</Grid>
				<Grid item xs={3}>
					{/* <Button endIcon={<Preview />} disabled={report.length <= 0} fullWidth>
						<CSVLink data={reportSortedCSV}>Export CSV</CSVLink>
					</Button> */}
				</Grid>
			</Grid>

			<ReportingPrintPreviewModal
				open={isModalExportOpen}
				handleModalClose={handleModalClose}
				reportElementInString={reportHTMLCSSString}
			/>

			{loading && (
				<>
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
					<Typography color="GrayText" flexGrow={1} align="center">
						Generating Report... Please wait...
					</Typography>
				</>
			)}

			{!loading && (
				<Paper elevation={3}>
					<TableContainer
						ref={tableRef}
						sx={{
							overflowX: "auto",
							maxHeight: tableMaxHeight,
						}}
					>
						<Table stickyHeader>
							<TableHead sx={{ position: "sticky", top: 0 }}>
								<TableRow>
									<TableCell colSpan={11} padding="none" align="left">
										<Typography variant="h6" letterSpacing={4}>
											BARAHAT AL JANOUB - Progress Summary Report
										</Typography>
									</TableCell>
									<TableCell
										colSpan={21}
										padding="checkbox"
										align="left"
										sx={{
											borderColor: grey[500],
											borderLeft: "solid 1px",
										}}
										component="th"
									>
										<Typography variant="caption" letterSpacing={4}>
											{phaseName} / {classificationName}
										</Typography>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell colSpan={11} padding="none" />
									<TableCell
										colSpan={21}
										padding="checkbox"
										align="left"
										sx={{
											borderColor: grey[500],
											borderLeft: "solid 1px",
										}}
										component="th"
									>
										<Typography variant="body2" letterSpacing={8}>
											Activities
										</Typography>

										<Chip label="100%" sx={{ m: 1, backgroundColor: green[400] }} />
										<Chip label="75%" sx={{ m: 1, backgroundColor: blue[400] }} />
										<Chip label="50%" sx={{ m: 1, backgroundColor: orange[400] }} />
										<Chip label="1%" sx={{ m: 1, backgroundColor: yellow[400] }} />
										<Chip label="0%" sx={{ m: 1, backgroundColor: red[400] }} />
									</TableCell>
								</TableRow>
								<TableRow sx={{ height: 120 }}>
									{Object.keys(TABLE_HEADER_REPORTING_SUMMARY_PROGRESS).map(
										(text, index) => {
											return (
												text !== "isCancelled" &&
												!text.includes("activity") && (
													<TableCell
														key={index + text}
														align="center"
														sortDirection={sort.key === text ? sort.order : false}
														sx={{
															borderColor: grey[500],
															borderLeft: "solid 1px",
														}}
													>
														<TableSortLabel
															hideSortIcon
															active={sort.key === text}
															direction={sort.key === text ? sort.order : "asc"}
															onClick={() => {
																handleHeaderSort(
																	text as
																		| keyof ReportProgressSummaryConstruction
																		| keyof ReportProgressSummaryTestingCommissioning
																);
															}}
														>
															<Typography
																variant="overline"
																fontSize={12}
																lineHeight={1.2}
															>
																{
																	TABLE_HEADER_REPORTING_SUMMARY_PROGRESS[
																		text as keyof typeof TABLE_HEADER_REPORTING_SUMMARY_PROGRESS
																	]
																}
															</Typography>
														</TableSortLabel>
													</TableCell>
												)
											);
										}
									)}

									{Object.keys(
										phaseName === "Construction"
											? TABLE_HEADER_REPORTING_SUMMARY_PROGRESS_ACTIVITY_CONSTRUCTION
											: TABLE_HEADER_REPORTING_SUMMARY_PROGRESS_ACTIVITY_TNC
									).map((text, index) => {
										return (
											<TableCell
												padding="none"
												key={index + text}
												align="center"
												sortDirection={sort.key === text ? sort.order : false}
												sx={{
													borderColor: grey[500],
													borderLeft: "solid 1px",
												}}
											>
												<TableSortLabel
													hideSortIcon
													active={sort.key === text}
													direction={sort.key === text ? sort.order : "asc"}
													onClick={() => {
														handleHeaderSort(
															text as
																| keyof ReportProgressSummaryConstruction
																| keyof ReportProgressSummaryTestingCommissioning
														);
													}}
												>
													<Typography
														variant="overline"
														sx={{ transform: "rotate(-90deg)" }}
														lineHeight={1.2}
													>
														{phaseName === "Construction"
															? TABLE_HEADER_REPORTING_SUMMARY_PROGRESS_ACTIVITY_CONSTRUCTION[
																	text as keyof typeof TABLE_HEADER_REPORTING_SUMMARY_PROGRESS_ACTIVITY_CONSTRUCTION
															  ]
															: TABLE_HEADER_REPORTING_SUMMARY_PROGRESS_ACTIVITY_TNC[
																	text as keyof typeof TABLE_HEADER_REPORTING_SUMMARY_PROGRESS_ACTIVITY_TNC
															  ]}
													</Typography>
												</TableSortLabel>
											</TableCell>
										);
									})}
								</TableRow>
							</TableHead>
							<TableBody>
								{!loading && !success && message && (
									<TableRow>
										<TableCell align="center" colSpan={12}>
											<Typography color={red[500]}>
												{`${message} Please contact support.`}
											</Typography>
										</TableCell>
									</TableRow>
								)}
								{reportSorted.length > 0 &&
									reportSorted
										?.slice(
											page * rowsPerPage,
											page * rowsPerPage +
												(rowsPerPage < 0 ? reportSorted.length : rowsPerPage)
										)
										.map((item) => {
											return (
												<Row
													key={`${item.inspectionDate} ${item.inspectionNumber}`}
													row={item}
												/>
											);
										})}
							</TableBody>
						</Table>
					</TableContainer>

					<TablePagination
						component="div"
						labelRowsPerPage="Item(s) shown:"
						rowsPerPageOptions={[10, 25, 50, { label: "All", value: -1 }]}
						count={reportSorted?.length || 0}
						rowsPerPage={rowsPerPage}
						page={page}
						SelectProps={{
							inputProps: {
								"aria-label": "rows per page",
							},
							native: true,
						}}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
						ActionsComponent={TablePaginationActions}
					/>
				</Paper>
			)}
		</>
	);
};

const Row = <
	T extends ReportProgressSummaryConstruction | ReportProgressSummaryTestingCommissioning
>(props: {
	row: T;
}): JSX.Element => {
	const { row } = props;
	const rowWithType = useMemo(() => {
		if (row["__typename"] === "ReportProgressSummaryConstruction")
			return row as unknown as ReportProgressSummaryConstruction;

		return row as unknown as ReportProgressSummaryTestingCommissioning;
	}, [row]);

	return (
		<TableRow>
			<TableCell component="th" scope="row" align="center">
				{rowWithType.inspectionNumber}
			</TableCell>
			<TableCell align="center">
				{dateHelperFormat(new Date(rowWithType.inspectionDate))}
			</TableCell>
			<TableCell align="center">{rowWithType.bldgCode}</TableCell>
			<TableCell align="center">{rowWithType.ownerName}</TableCell>
			<TableCell align="center">{rowWithType.typeCode}</TableCell>
			<TableCell align="center">{rowWithType.constructionMethodName}</TableCell>
			<TableCell align="center">{rowWithType.milestoneCode}</TableCell>
			<TableCell align="center">{rowWithType.unit}</TableCell>
			<TableCell align="center">{rowWithType.module}</TableCell>
			{Object.keys(row).map((header, index) => {
				const headerKey = header as keyof T;

				if (header.includes("activity"))
					return (
						<TableCell
							key={header + index}
							align="center"
							sx={{
								backgroundColor: getCSSReportColor(row[headerKey] as unknown as number),
							}}
						>
							{`${row[headerKey]}%`}
						</TableCell>
					);
			})}
		</TableRow>
	);
};
