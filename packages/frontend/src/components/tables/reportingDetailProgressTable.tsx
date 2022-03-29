import { useMemo, useState, Fragment, useEffect, useRef } from "react";
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
import { baseUrl, TABLE_HEADER_REPORTING_DETAIL_PROGRESS } from "utilities/constant";
import { useAxios } from "hooks/useAxios";
import { ReportProgressDetailInterface } from "types/interface";
import { getToken } from "utilities/storage";
import { CircularProgress, TablePagination, Typography } from "@mui/material";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { useWindowDimensions } from "hooks/useWindowDimensions";
import { red } from "@mui/material/colors";

import { ReportingDetailProgressActivityTable } from "./reportingDetailProgressActivityTable";

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
		<Fragment>
			<TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
				<TableCell align="center" padding="checkbox">
					<IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell component="th" scope="row" align="center">
					{row.DocNo}
				</TableCell>
				<TableCell align="center">
					{new Date(row.DocDt).toLocaleDateString("en-US", {
						day: "2-digit",
						month: "2-digit",
						year: "numeric",
					})}
				</TableCell>
				<TableCell align="center">{row.Bld}</TableCell>
				<TableCell align="center">{row.Own}</TableCell>
				<TableCell align="center">{row.Typ}</TableCell>
				<TableCell align="center">{row.Cns}</TableCell>
				<TableCell align="center">{row.Mst}</TableCell>
				<TableCell align="center">{row.Unt}</TableCell>
				<TableCell align="center">{row.Mdl}</TableCell>
				<TableCell align="center">{row.PhsName}</TableCell>
				<TableCell align="center">{row.ClsName}</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ padding: 0 }} colSpan={12}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<ReportingDetailProgressActivityTable activities={row.activities} />
					</Collapse>
				</TableCell>
			</TableRow>
		</Fragment>
	);
};

const extractCSS = (styleSheetList: StyleSheetList): string => {
	let allCSSStyle = "";

	for (const styleSheet in styleSheetList) {
		try {
			for (const cssRules in styleSheetList[styleSheet].cssRules) {
				const cssString = styleSheetList[styleSheet].cssRules[cssRules].cssText;

				if (cssString) allCSSStyle = `${allCSSStyle}\n${cssString}`;
			}
		} catch (error) {
			console.log("No access error with styleSheet");
		}
	}
	// const allCSS = [...styleSheetList]
	// 	.map((styleSheet) => {
	// 		try {
	// 			return [...styleSheet.cssRules].map((rule) => rule.cssText).join("");
	// 		} catch (e) {
	// 			console.log("Access to stylesheet %s is denied. Ignoring...", styleSheet.href);
	// 		}
	// 	})
	// 	.filter(Boolean)
	// 	.join("");

	return allCSSStyle;
};
export const ReportingDetailProgressTable = (): JSX.Element => {
	const [report, setReport] = useState<ReportProgressDetailInterface[]>([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [openAll, setOpenAll] = useState(true);

	const { width } = useWindowDimensions();
	const tableRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		// if (report?.length > 0) {
		// 	console.log("@tableRef\n", tableRef.current?.innerHTML);
		// 	console.log("@tableRef extractCSS", extractCSS(document.styleSheets));
		// }

		console.log("@tableRef\n", tableRef.current?.innerHTML);
		console.log("@tableRef extractCSS", extractCSS(document.styleSheets));
	}, [tableRef, report]);
	const {
		data: reportData,
		fetch: reportFetch,
		loading: reportLoading,
		success: reportSuccess,
		message: reportMessage,
	} = useAxios<ReportProgressDetailInterface[]>(baseUrl + "/report/progressive-detail");

	useEffect(() => {
		if (!reportLoading && reportSuccess && reportData) {
			reportData.sort(
				(compareReportA, compareReportB) => compareReportA.DocNo - compareReportB.DocNo
			);
			setReport(reportData);
		} else setReport([]);
	}, [reportData, reportSuccess, reportLoading]);

	useEffect(() => {
		const token = getToken();

		if (token)
			reportFetch({
				headers: {
					Authorization: `Token ${token}`,
				},
			});
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

	return (
		<>
			{reportLoading ? (
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
			) : (
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
									<TableCell align="center">
										{TABLE_HEADER_REPORTING_DETAIL_PROGRESS.DocNo}
									</TableCell>
									<TableCell align="center">
										{TABLE_HEADER_REPORTING_DETAIL_PROGRESS.DocDt}
									</TableCell>
									<TableCell align="center">
										{TABLE_HEADER_REPORTING_DETAIL_PROGRESS.Bld}
									</TableCell>
									<TableCell align="center">
										{TABLE_HEADER_REPORTING_DETAIL_PROGRESS.Own}
									</TableCell>
									<TableCell align="center">
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
								{report.length > 0 &&
									report
										?.slice(
											page * rowsPerPage,
											page * rowsPerPage + (rowsPerPage < 0 ? report.length : rowsPerPage)
										)
										.map((item) => {
											return (
												<Row
													key={`${item.id} ${item.DocNo}`}
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
						rowsPerPageOptions={[10, 25, 50, { label: "All", value: -1 }]}
						count={reportData?.length || 0}
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
