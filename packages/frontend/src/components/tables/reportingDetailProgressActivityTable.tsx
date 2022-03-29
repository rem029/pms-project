import { Box, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { LinearProgressWithLabel } from "components/utilities/linearProgressWithLabel";
import { Activity } from "types/interface";
import { TABLE_HEADER_REPORTING_DETAIL_PROGRESS } from "utilities/constant";

export const ReportingDetailProgressActivityTable = (props: {
	activities: Activity[];
}): JSX.Element => {
	const { activities } = props;

	return (
		<Box sx={{ m: 0, p: 0 }}>
			<Table size="small" aria-label="activities">
				<TableHead sx={{ p: 1 }}>
					<TableRow>
						<TableCell align="left" padding="checkbox">
							Activitity
						</TableCell>
						<TableCell align="center" padding="checkbox">
							{TABLE_HEADER_REPORTING_DETAIL_PROGRESS.id}
						</TableCell>
						<TableCell align="center" padding="checkbox">
							{TABLE_HEADER_REPORTING_DETAIL_PROGRESS.cd}
						</TableCell>
						<TableCell align="left" padding="checkbox">
							{TABLE_HEADER_REPORTING_DETAIL_PROGRESS.nm}
						</TableCell>
						<TableCell align="center" padding="none" sx={{ width: 320 }}>
							{TABLE_HEADER_REPORTING_DETAIL_PROGRESS.prg}
						</TableCell>
						<TableCell align="left">
							{TABLE_HEADER_REPORTING_DETAIL_PROGRESS.com}
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{activities.map((activity) => (
						<TableRow key={`${activity.id} ${activity.name}`}>
							<TableCell align="center" />
							<TableCell align="center">{activity.id}</TableCell>
							<TableCell align="center">{activity.code}</TableCell>
							<TableCell align="left">{activity.name}</TableCell>
							<TableCell align="left">
								<LinearProgressWithLabel value={activity.progress} />
							</TableCell>
							<TableCell align="left">{activity.comment}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Box>
	);
};
