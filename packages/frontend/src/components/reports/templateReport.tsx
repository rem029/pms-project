import { Grid } from "@mui/material";
import { Options } from "../options";
import { PageContainer } from "components/utilities/pageContainer";

interface ReportingInterface {
	title: string;
}

export const ReportTemplate = ({ title }: ReportingInterface): JSX.Element => {
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
