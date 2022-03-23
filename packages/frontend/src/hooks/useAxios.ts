import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { useState } from 'react';

export const useAxios = <T>(
  url: string
): {
  success: boolean;
  loading: boolean;
  data: T | undefined;
  error: AxiosError | undefined;
  message: string;
  fetch: (config: AxiosRequestConfig) => void;
} => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | undefined>(undefined);
  const [message, setMessage] = useState('');
  const [error, setError] = useState<AxiosError | undefined>(undefined);
  const [success, setSuccess] = useState(false);

  const fetch = (config: AxiosRequestConfig): void => {
    setLoading(true);

    setData(undefined);
    setSuccess(false);
    setMessage('');
    setError(undefined);

    axios
      .get(url, config)
      .then((res) => {
        setData(res.data.data);
        setMessage(res.data.message);
        setSuccess(res.data.success);
        setLoading(false);
      })
      .catch((error: AxiosError) => {
        if (error) {
          setData(error.response?.data?.data || undefined);
          setSuccess(error.response?.data.success);
          setMessage(error.response?.data.message || '');
          setError(error);
          setLoading(false);
        }
      });
  };

  return { success, loading, data, error, message, fetch };
};
