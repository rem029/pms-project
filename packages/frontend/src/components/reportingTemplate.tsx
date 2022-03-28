import { Button, Divider, Grid, TextField, Typography } from "@mui/material";
import { Options } from "./options";
import { PageContainer } from "./utilities/pageContainer";

interface ReportingInterface {
	title: string;
}

export const Reporting = ({ title }: ReportingInterface): JSX.Element => {
	return (
		<PageContainer title={title}>
			<Grid
				container
				spacing={1}
				justifyContent="center"
				sx={{ p: 1 }}
				flexDirection="column"
			>
				<Options />
			</Grid>
		</PageContainer>
	);
};
