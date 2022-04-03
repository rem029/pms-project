import { useState } from "react";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useSnackbar } from "notistack";
import { getUserContext } from "store/userProvider";
import { NOTISTACK_AUTO_HIDE_MS } from "utils/constant";

type AxiosType = "get" | "post" | "delete" | "patch";

export const useAxios = <T>(
	url: string
): {
	success: boolean;
	loading: boolean;
	data: T | undefined;
	error: AxiosError | undefined;
	message: string;
	fetch: (method: AxiosType, config?: AxiosRequestConfig) => void;
	fetchCancel: () => void;
} => {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<T | undefined>(undefined);
	const [message, setMessage] = useState("");
	const [error, setError] = useState<AxiosError | undefined>(undefined);
	const [success, setSuccess] = useState(false);

	const [axiosController, setAxiosController] = useState<AbortController>();
	const { logout } = getUserContext();
	const { enqueueSnackbar } = useSnackbar();

	const resetState = (): void => {
		setLoading(false);
		setData(undefined);
		setSuccess(false);
		setMessage("");
		setError(undefined);
	};

	const fetchCancel = (): void => {
		axiosController?.abort();
	};

	const fetch = (method: AxiosType, config?: AxiosRequestConfig): void => {
		resetState();

		const controller = new AbortController();
		setAxiosController(controller);
		const request = axios.create({ ...config, signal: controller.signal });

		setLoading(true);
		request[method](url)
			.then((response) => {
				setLoading(false);
				setData(response.data.data);
				setMessage(response.data.message);
				setSuccess(response.data.success);

				enqueueSnackbar(response.data.message, {
					variant: "default",
					autoHideDuration: NOTISTACK_AUTO_HIDE_MS,
				});
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

	return { success, loading, data, error, message, fetch, fetchCancel };
};
