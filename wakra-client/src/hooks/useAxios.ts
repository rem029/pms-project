import axios, { AxiosRequestConfig } from 'axios';
import { useState } from 'react';


export const useAxios = <T>(url: string) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(null);
  const [success,setSuccess] = useState(false)

  const fetch = (config: AxiosRequestConfig): void => {
    setLoading(true);
    axios
      .get(url, config)
      .then((res) => {
        setData(res.data.data);
        setSuccess(res.data.success);
        setLoading(false);
      })
      .catch((error) => {
        setData(error.response.data.data);
        setSuccess(error.response.data.success);
        setError(error);
        setLoading(false);
        
      });
  };

  return { success,loading, data, error, fetch };
};
