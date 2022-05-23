import { Container, Typography } from "@mui/material";

interface PageContainerInterface {
	title: string;
	children: JSX.Element;
}
export const PageContainer = ({
	title,
	children,
}: PageContainerInterface): JSX.Element => {
	return (
		<Container maxWidth="xl" sx={{ flexGrow: 1, padding: 1, mt: 0.5 }}>
			<Typography color="primary" variant="h5" component="div" paddingBottom={1}>
				{title}
			</Typography>
			{children}
		</Container>
	);
};
