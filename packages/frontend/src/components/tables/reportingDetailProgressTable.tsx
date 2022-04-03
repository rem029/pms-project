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
import {
	TABLE_HEADER_REPORTING_DETAIL_PROGRESS,
	URL_REPORTING_DETAIL_PROGRESS,
} from "utils/constant";
import { useAxios } from "hooks/useAxios";
import { ReportProgressDetailInterface } from "types/interface";
import { getToken } from "utils/storage";
import { Button, CircularProgress, TablePagination, Typography } from "@mui/material";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { useWindowDimensions } from "hooks/useWindowDimensions";
import { red } from "@mui/material/colors";

import { ReportingDetailProgressActivityTable } from "./reportingDetailProgressActivityTable";
import { getDocumentCSS } from "helper/documentCSSHelper";
import { formatDate } from "helper/dateHelper";
import { Preview } from "@mui/icons-material";
import { ReportingPrintPreviewModal } from "components/utilities/reportingPrintPreviewModal";

type TableSortBy =
	| "inspectionNumber"
	| "inspectionDate"
	| "bldgCode"
	| "ownerName"
	| "typeCode"
	| "constructionMethodName"
	| "projectCode"
	| "milestoneCode"
	| "Unit"
	| "module"
	| "phaseName"
	| "classificationName";

type TableOrderBy = "asc" | "desc";

export const ReportingDetailProgressTable = (): JSX.Element => {
	const [report, setReport] = useState<ReportProgressDetailInterface[]>([]);
	const [reportHTMLCSSString, setReportHTMLCSSString] = useState("");
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [openAll, setOpenAll] = useState(true);
	const [isModalExportOpen, setIsModalExportOpen] = useState(false);

	const [sortBy, setSortBy] = useState<TableSortBy>("inspectionNumber");
	const [orderBy, setOrderBy] = useState<TableOrderBy>("desc");

	const { width } = useWindowDimensions();
	const tableRef = useRef<HTMLDivElement>(null);

	const {
		data: reportData,
		fetch: reportFetch,
		fetchCancel: reportFetchCancel,
		loading: reportLoading,
		success: reportSuccess,
		message: reportMessage,
	} = useAxios<ReportProgressDetailInterface[]>(URL_REPORTING_DETAIL_PROGRESS);

	const reportSorted = useMemo(() => {
		if (report.length > 0) {
			return [...report].sort((compareReportA, compareReportB) => {
				const compareA = compareReportA[sortBy];
				const compareB = compareReportB[sortBy];

				if (orderBy === "desc" && compareA > compareB) return -1;
				if (orderBy === "asc" && compareB < compareA) return 1;

				return 0;
			});
		}

		return [] as ReportProgressDetailInterface[];
	}, [report, orderBy]);

	useEffect(() => {
		console.log("@useEffect width", width);
	}, [width]);

	useEffect(() => {
		if (!reportLoading && reportSuccess && reportData) {
			setReport(reportData);
		} else setReport([]);
	}, [reportData, reportSuccess, reportLoading]);

	useEffect(() => {
		const token = getToken();

		if (token) {
			reportFetch("get", {
				headers: {
					Authorization: `Token ${token}`,
				},
			});
		}

		return () => reportFetchCancel();
	}, []);

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
			`<style>${getDocumentCSS()}</style> ${tableRef.current?.innerHTML}`
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
			<Button
				onClick={handleButtonExportClick}
				endIcon={<Preview />}
				disabled={report.length <= 0}
			>
				Print Preview
			</Button>
			<ReportingPrintPreviewModal
				open={isModalExportOpen}
				handleModalClose={handleModalClose}
				reportElementInString={reportHTMLCSSString}
			/>

			{reportLoading && (
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

			{!reportLoading && (
				<>
					<TableContainer
						ref={tableRef}
						component={Paper}
						sx={{
							overflowX: "auto",
							width: () => {
								if (width > 0 && width < 540) return width - 50;
								if (width > 540) return width - 90;
							},
							maxHeight: rowsPerPage < 0 ? undefined : 480,
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
									<TableCell
										align="center"
										onClick={() => {
											handleHeaderSort("inspectionNumber");
										}}
										sortDirection={sortBy === "inspectionNumber" ? orderBy : false}
									>
										{TABLE_HEADER_REPORTING_DETAIL_PROGRESS.DocNo}
									</TableCell>
									<TableCell
										align="center"
										onClick={() => {
											handleHeaderSort("inspectionDate");
										}}
										sortDirection={sortBy === "inspectionDate" ? orderBy : false}
									>
										{TABLE_HEADER_REPORTING_DETAIL_PROGRESS.DocDt}
									</TableCell>
									<TableCell
										align="center"
										onClick={() => {
											handleHeaderSort("bldgCode");
										}}
										sortDirection={sortBy === "bldgCode" ? orderBy : false}
									>
										{TABLE_HEADER_REPORTING_DETAIL_PROGRESS.Bld}
									</TableCell>
									<TableCell
										align="center"
										onClick={() => {
											handleHeaderSort("ownerName");
										}}
										sortDirection={sortBy === "ownerName" ? orderBy : false}
									>
										{TABLE_HEADER_REPORTING_DETAIL_PROGRESS.Own}
									</TableCell>
									<TableCell
										align="center"
										onClick={() => {
											handleHeaderSort("typeCode");
										}}
										sortDirection={sortBy === "typeCode" ? orderBy : false}
									>
										{TABLE_HEADER_REPORTING_DETAIL_PROGRESS.Typ}
									</TableCell>
									<TableCell align="center" sx={{ maxWidth: 110 }}>
										{TABLE_HEADER_REPORTING_DETAIL_PROGRESS.Cns}
									</TableCell>
									<TableCell align="center" sx={{ maxWidth: 110 }}>
										{TABLE_HEADER_REPORTING_DETAIL_PROGRESS.Mst}
									</TableCell>
									<TableCell align="center">
										{TABLE_HEADER_REPORTING_DETAIL_PROGRESS.Unt}
									</TableCell>
									<TableCell align="center">
										{TABLE_HEADER_REPORTING_DETAIL_PROGRESS.Mdl}
									</TableCell>
									<TableCell align="center">
										{TABLE_HEADER_REPORTING_DETAIL_PROGRESS.PhsName}
									</TableCell>
									<TableCell align="center">
										{TABLE_HEADER_REPORTING_DETAIL_PROGRESS.ClsName}
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{!reportLoading && !reportSuccess && reportMessage && (
									<TableRow>
										<TableCell align="center" colSpan={12}>
											<Typography color={red[500]}>
												{`${reportMessage} Please contact support.`}
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
						labelRowsPerPage="Item(s) shown:"
						rowsPerPageOptions={[10, 25, 50]}
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
				</>
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
				<TableCell align="center">{formatDate(new Date(row.inspectionDate))}</TableCell>
				<TableCell align="center">{row.bldgCode}</TableCell>
				<TableCell align="center">{row.ownerName}</TableCell>
				<TableCell align="center">{row.typeCode}</TableCell>
				<TableCell align="center">{row.constructionMethodName}</TableCell>
				<TableCell align="center">{row.milestoneCode}</TableCell>
				<TableCell align="center">{row.Unit}</TableCell>
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
