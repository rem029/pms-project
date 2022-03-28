import { useMemo, useState, Fragment, useEffect } from "react";
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
import { groupBy } from "lodash";
import { getToken } from "utilities/storage";
import { TableFooter, TablePagination } from "@mui/material";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";

const Row = (props: { row: ReportProgressDetailInterface }): JSX.Element => {
	const { row } = props;
	const [open, setOpen] = useState(false);

	return (
		<Fragment>
			<TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
				<TableCell align="center">
					<IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell component="th" scope="row" align="center">
					{row.DocNo}
				</TableCell>
				<TableCell align="center">{row.DocDt}</TableCell>
				<TableCell align="center">{row.Bld}</TableCell>
				<TableCell align="center">{row.Own}</TableCell>
				<TableCell align="center">{row.Typ}</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 0 }}>
							<Table size="small" aria-label="purchases">
								<TableHead>
									<TableRow>
										<TableCell align="center">
											{TABLE_HEADER_REPORTING_DETAIL_PROGRESS.id}
										</TableCell>
										<TableCell align="center">
											{TABLE_HEADER_REPORTING_DETAIL_PROGRESS.cd}
										</TableCell>
										<TableCell align="center">
											{TABLE_HEADER_REPORTING_DETAIL_PROGRESS.nm}
										</TableCell>
										<TableCell align="center">
											{TABLE_HEADER_REPORTING_DETAIL_PROGRESS.prg}
										</TableCell>
										<TableCell align="center">
											{TABLE_HEADER_REPORTING_DETAIL_PROGRESS.com}
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									<TableRow>
										<TableCell align="center">{row.DocDt}</TableCell>
										<TableCell align="center">{row.Bld}</TableCell>
										<TableCell align="center">{row.Own}</TableCell>
										<TableCell align="center">{row.Typ}</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</Fragment>
	);
};

export const ReportingDetailProgressTable = (): JSX.Element => {
	const {
		data: reportData,
		fetch: reportFetch,
		loading: reportLoading,
		success: reportSuccess,
		message: reportMessage,
	} = useAxios<ReportProgressDetailInterface[]>(baseUrl + "/report/progressive-detail");
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

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
		event: React.MouseEvent<HTMLButtonElement> | null,
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
		<TableContainer component={Paper} sx={{ overflowX: "auto" }}>
			<Table aria-label="collapsible table">
				<TableHead>
					<TableRow>
						<TableCell align="center" />
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
						<TableCell align="center">
							{TABLE_HEADER_REPORTING_DETAIL_PROGRESS.Cns}
						</TableCell>
						<TableCell align="center">
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
					{reportData && rowsPerPage > 0
						? reportData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
						: reportData?.map((data) => {
								return <Row key={`${data.id} ${data.DocNo}`} row={data} />;
						  })}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TablePagination
							rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
							colSpan={3}
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
					</TableRow>
				</TableFooter>
			</Table>
		</TableContainer>
	);
};
