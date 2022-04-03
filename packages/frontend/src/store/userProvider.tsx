import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { deleteToken } from "utils/storage";
import { useSnackbar } from "notistack";
import { NOTISTACK_AUTO_HIDE_MS } from "utils/constant";

interface UserContextInterface {
	logout: () => void;
}

const userContext = createContext({} as UserContextInterface);

const { Provider } = userContext;

export const getUserContext = (): UserContextInterface => useContext(userContext);

export const UserProvider = (props: { children: JSX.Element }): JSX.Element => {
	const { children } = props;
	const navigate = useNavigate();
	const { enqueueSnackbar } = useSnackbar();

	const logout = (): void => {
		deleteToken();
		navigate("/login");
		enqueueSnackbar("Logout successful.", { autoHideDuration: NOTISTACK_AUTO_HIDE_MS });
	};

	return <Provider value={{ logout: logout }}>{children}</Provider>;
};
