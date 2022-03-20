import axios, { AxiosRequestConfig } from 'axios';
import { useState } from 'react';

export const useAxios = (url: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    success: false,
    message: '',
    data: null,
    error: null,
  });
  const [error, setError] = useState(null);

  const fetch = (config: AxiosRequestConfig): void => {
    setIsLoading(true);
    axios
      .get(url, config)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setData(error.response.data);
        setError(error);
        setIsLoading(false);
      });
  };

  return { isLoading, data, error, fetch };
};
