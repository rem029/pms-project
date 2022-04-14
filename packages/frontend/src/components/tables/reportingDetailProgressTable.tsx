import { useState, useEffect, useRef, useMemo } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { TABLE_HEADER_REPORTING_DETAIL_PROGRESS } from "utils/constants";

import { parse } from "json2csv";
import { CSVLink } from "react-csv";

import { ReportProgressDetailInterface } from "@wakra-project/common";

import {
	Button,
	CircularProgress,
	Grid,
	TablePagination,
	TableSortLabel,
	Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";

import { ReportingDetailProgressActivityTable } from "./reportingDetailProgressActivityTable";
import { getCSSDocument } from "helpers/cssHelper";
import { dateHelperFormat } from "helpers/dateHelper";
import { Preview } from "@mui/icons-material";
import { ReportingPrintPreviewModal } from "components/utilities/reportingPrintPreviewModal";
import { TablePaginationActions } from "components/utilities/tablePaginationActions";

type TableSortBy =
	| "inspectionNumber"
	| "inspectionDate"
	| "bldgCode"
	| "ownerName"
	| "typeCode"
	| "constructionMethodName"
	| "projectCode"
	| "milestoneCode"
	| "unit"
	| "module"
	| "phaseName"
	| "classificationName";

type TableOrderBy = "asc" | "desc";
const tableMaxHeight = 720;

interface ReportingTableProps {
	data?: ReportProgressDetailInterface[];
	success: boolean;
	message: string;
	loading: boolean;
}

export const ReportingDetailProgressTable = ({
	data,
	success,
	message,
	loading,
}: ReportingTableProps): JSX.Element => {
	const [report, setReport] = useState<ReportProgressDetailInterface[]>([]);
	const [reportHTMLCSSString, setReportHTMLCSSString] = useState("");
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [openAll, setOpenAll] = useState(false);
	const [isModalExportOpen, setIsModalExportOpen] = useState(false);

	const [sortBy, setSortBy] =
		useState<keyof ReportProgressDetailInterface>("inspectionDate");
	const [orderBy, setOrderBy] = useState<TableOrderBy>("desc");

	const tableRef = useRef<HTMLDivElement>(null);

	const reportSorted = useMemo(() => {
		if (report.length > 0) {
			return [...report].sort((compareReportA, compareReportB) => {
				const compareA =
					sortBy === "inspectionDate"
						? new Date(compareReportA[sortBy]).getTime()
						: compareReportA[sortBy];

				const compareB =
					sortBy === "inspectionDate"
						? new Date(compareReportB[sortBy]).getTime()
						: compareReportB[sortBy];

				console.log("compareA", sortBy, typeof compareA, compareA);
				console.log("compareB", sortBy, typeof compareB, compareB);

				if (orderBy === "desc" && compareA > compareB) return -1;
				if (orderBy === "asc" && compareB < compareA) return 1;

				return 0;
			});
		}

		return [] as ReportProgressDetailInterface[];
	}, [report, orderBy]);

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

	const handleHeaderSort = (headerName: TableSortBy): void => {
		setSortBy(headerName);
		setOrderBy((currentOrderBy) => (currentOrderBy === "asc" ? "desc" : "asc"));
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
							maxHeight: rowsPerPage < 0 ? undefined : tableMaxHeight,
						}}
					>
						<Table aria-label="collapsible table" stickyHeader>
							<TableHead>
								<TableRow>
									<TableCell align="center" padding="checkbox">
										<IconButton
											aria-label="expand row"
											size="small"
											onClick={() => setOpenAll(!openAll)}
										>
											{openAll ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
										</IconButton>
									</TableCell>
									{Object.keys(TABLE_HEADER_REPORTING_DETAIL_PROGRESS).map(
										(text, index) => {
											return (
												text !== "isCancelled" &&
												text !== "activities" && (
													<TableCell
														key={index + text}
														align="center"
														sortDirection={sortBy === text ? orderBy : false}
														sx={{ minWidth: 120 }}
													>
														<TableSortLabel
															active={sortBy === text}
															direction={sortBy === text ? orderBy : "asc"}
															onClick={() => {
																handleHeaderSort(text as TableSortBy);
															}}
														>
															<Typography
																variant="overline"
																fontSize={12}
																lineHeight={1.2}
															>
																{TABLE_HEADER_REPORTING_DETAIL_PROGRESS[
																	text as keyof typeof TABLE_HEADER_REPORTING_DETAIL_PROGRESS
																].toString()}
															</Typography>
														</TableSortLabel>
													</TableCell>
												)
											);
										}
									)}
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
													openAll={openAll}
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

const Row = (props: {
	openAll: boolean;
	row: ReportProgressDetailInterface;
}): JSX.Element => {
	const { row, openAll } = props;
	const [open, setOpen] = useState(openAll);

	useEffect(() => {
		setOpen(openAll);
	}, [openAll]);

	return (
		<>
			<TableRow>
				<TableCell align="center" padding="checkbox">
					<IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell component="th" scope="row" align="center">
					{row.inspectionNumber}
				</TableCell>
				<TableCell align="center">
					{dateHelperFormat(new Date(row.inspectionDate))}
				</TableCell>
				<TableCell align="center">{row.bldgCode}</TableCell>
				<TableCell align="center">{row.ownerName}</TableCell>
				<TableCell align="center">{row.typeCode}</TableCell>
				<TableCell align="center">{row.constructionMethodName}</TableCell>
				<TableCell align="center">{row.milestoneCode}</TableCell>
				<TableCell align="center">{row.unit}</TableCell>
				<TableCell align="center">{row.module}</TableCell>
				<TableCell align="center">{row.phaseName}</TableCell>
				<TableCell align="center">{row.classificationName}</TableCell>
			</TableRow>
			<TableRow>
				<TableCell sx={{ p: 0 }} colSpan={12}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<ReportingDetailProgressActivityTable activities={row.activities} />
						<Box
							component="div"
							sx={{ pageBreakBefore: "always", displayPrint: "block" }}
						></Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	);
};
