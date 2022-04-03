import { SnackbarProvider } from "notistack";

export const NotificationProvider = (props: {
	children: JSX.Element;
	maxNotification: number;
}): JSX.Element => {
	const { children, maxNotification } = props;

	return <SnackbarProvider maxSnack={maxNotification}>{children}</SnackbarProvider>;
};
