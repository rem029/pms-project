import { useEffect, useMemo, useState } from "react";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useSnackbar } from "notistack";
import { getUserContext } from "store/userProvider";
import { NOTISTACK_AUTO_HIDE_MS } from "utils/constants";

export const useAxios = <T>(
	url: string,
	config?: AxiosRequestConfig
): {
	data: T | undefined;
	error: AxiosError | undefined;
	message: string;
	success: boolean;
	loading: boolean;
	config: AxiosRequestConfig | undefined;
	fetch: (config?: AxiosRequestConfig) => void;
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

	const fetch = (config?: AxiosRequestConfig): void => {
		resetState();

		const controller = new AbortController();
		setAxiosController(controller);
		const request = axios.create({
			...axiosConfig,
			...config,
			signal: controller.signal,
		});

		setLoading(true);

		request(url)
			.then((response) => {
				setLoading(false);
				setData(response.data.data);
				setMessage(response.data.message);
				setSuccess(response.data.success);
			})
			.catch((error: AxiosError) => {
				if (error) {
					enqueueSnackbar(error.response?.data.message || error.message, {
						variant: "error",
						autoHideDuration: NOTISTACK_AUTO_HIDE_MS,
					});

					if (error.response?.status === 401 || error.response?.status === 403) {
						resetState();
						logout();
						return;
					}
					setData(error.response?.data?.data || undefined);
					setSuccess(error.response?.data.success);
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
