import { Box, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { LinearProgressWithLabel } from "components/utilities/linearProgressWithLabel";
import { ReportProgressDetailActivity } from "@pms-project/common";
import { TABLE_HEADER_REPORTING_DETAIL_PROGRESS } from "utils/constants";

export const ReportingDetailProgressActivityTable = (props: {
	activities: ReportProgressDetailActivity[];
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
							{TABLE_HEADER_REPORTING_DETAIL_PROGRESS.activities.id}
						</TableCell>
						<TableCell align="center" padding="checkbox">
							{TABLE_HEADER_REPORTING_DETAIL_PROGRESS.activities.code}
						</TableCell>
						<TableCell align="left" padding="checkbox">
							{TABLE_HEADER_REPORTING_DETAIL_PROGRESS.activities.name}
						</TableCell>
						<TableCell align="center" padding="none" sx={{ width: 320 }}>
							{TABLE_HEADER_REPORTING_DETAIL_PROGRESS.activities.progress}
						</TableCell>
						<TableCell align="left">
							{TABLE_HEADER_REPORTING_DETAIL_PROGRESS.activities.comments}
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
							<TableCell align="left">{activity.comments}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Box>
	);
};
