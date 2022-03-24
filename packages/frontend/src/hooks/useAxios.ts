import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useState } from "react";
import { userLogout } from "utilities/userLogout";

export const useAxios = <T>(
	url: string
): {
	success: boolean;
	loading: boolean;
	data: T | undefined;
	error: AxiosError | undefined;
	message: string;
	fetch: (config: AxiosRequestConfig) => void;
	fetchCancel: () => void;
} => {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<T | undefined>(undefined);
	const [message, setMessage] = useState("");
	const [error, setError] = useState<AxiosError | undefined>(undefined);
	const [success, setSuccess] = useState(false);

	const [axiosController, setAxiosController] = useState<AbortController>();

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

	const fetch = (config?: AxiosRequestConfig): void => {
		resetState();

		const controller = new AbortController();
		setAxiosController(controller);
		const request = axios.create({ ...config, signal: controller.signal });

		setLoading(true);
		request
			.get(url)
			.then((response) => {
				setLoading(false);
				if (response.status === 401 || response.status === 403) {
					resetState();
					userLogout();
					return;
				}
				setData(response.data.data);
				setMessage(response.data.message);
				setSuccess(response.data.success);
			})
			.catch((error: AxiosError) => {
				if (error) {
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
