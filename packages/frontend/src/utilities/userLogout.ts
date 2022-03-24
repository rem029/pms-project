import { deleteToken } from "./storage";

export const userLogout = (): void => {
	deleteToken();
	window.location.reload();
};
