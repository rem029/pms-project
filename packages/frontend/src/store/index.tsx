import { NotificationProvider } from "./notificationProvider";
import { UserProvider } from "./userProvider";

export const StoreProvider = (props: {
	children: JSX.Element;
	maxNotification: number;
}): JSX.Element => {
	const { children, maxNotification } = props;

	return (
		<NotificationProvider maxNotification={maxNotification}>
			<UserProvider>{children}</UserProvider>
		</NotificationProvider>
	);
};
