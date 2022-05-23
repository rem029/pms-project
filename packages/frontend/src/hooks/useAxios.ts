import { useEffect, useMemo, useState } from "react";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useSnackbar } from "notistack";
import { getUserContext } from "store/userProvider";
import { NOTISTACK_AUTO_HIDE_MS } from "utils/constants";

export interface AxiosRequestCustomConfig extends AxiosRequestConfig {
	dontLogoutOnAuthError?: boolean;
}

export const useAxios = <T>(
	url: string,
	config?: AxiosRequestCustomConfig
): {
	data: T | undefined;
	error: AxiosError | undefined;
	message: string;
	success: boolean;
	loading: boolean;
	config: AxiosRequestCustomConfig | undefined;
	fetch: (config?: AxiosRequestCustomConfig) => void;
	fetchCancel: () => void;
} => {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<T | undefined>(undefined);
	const [message, setMessage] = useState("");
	const [error, setError] = useState<AxiosError | undefined>(undefined);
	const [success, setSuccess] = useState(false);

	const axiosConfig = useMemo(() => {
		return config;
	}, [config]);

	const [axiosController, setAxiosController] = useState<AbortController>();
	const { logout } = getUserContext();
	const { enqueueSnackbar } = useSnackbar();

	useEffect(() => {
		if ((axiosConfig && axiosConfig?.method === "get") || axiosConfig?.method === "GET") {
			fetch();
		}
	}, []);

	const resetState = (): void => {
		setLoading(false);
		setData(undefined);
		setSuccess(false);
		setMessage("");
		setError(undefined);
	};

	const fetchCancel = (): void => {
		if (axiosController) axiosController.abort();
	};

	const fetch = (config?: AxiosRequestCustomConfig): void => {
		const controller = new AbortController();
		const configMerged = {
			...axiosConfig,
			...config,
			signal: controller.signal,
		} as AxiosRequestCustomConfig;
		setAxiosController(controller);
		const request = axios.create(configMerged);
		console.log("@configMerged", configMerged);
		resetState();
		setLoading(true);

		request(url)
			.then((response) => {
				setLoading(false);
				setData(response.data.data ? response.data.data : response.data);
				setMessage(response.data.message ? response.data.message : response.statusText);
				setSuccess(true);
			})
			.catch((error: AxiosError) => {
				if (error) {
					enqueueSnackbar(error.response?.data.message || error.message, {
						variant: "error",
						autoHideDuration: NOTISTACK_AUTO_HIDE_MS,
					});

					if (error.response?.status === 401 || error.response?.status === 403) {
						if (!configMerged.dontLogoutOnAuthError) {
							logout();
						}
						resetState();
						return;
					}
					setData(error.response?.data?.data || undefined);
					setSuccess(false);
					setMessage(error.response?.data.message || error.message);
					setError(error);
					setLoading(false);
				}
			});
	};

	return {
		success,
		loading,
		data,
		error,
		message,
		config: axiosConfig,
		fetch,
		fetchCancel,
	};
};
