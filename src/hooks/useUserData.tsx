import { useCallback, useEffect, useRef, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import axios , { AxiosResponse, AxiosRequestConfig, AxiosInstance } from 'axios';
import { useNavigate } from 'react-router-dom';


//////////////////////////////////////////////
////////  Not Attached Hook anywhere ///////////////// just for tests purposes
/////////////////////////////////////////////
export const initializeAxios = (config: AxiosRequestConfig): AxiosInstance => {
    const axiosInstance = axios.create(config);

    axiosInstance.interceptors.request.use(
        (c) => c,
        (error) => Promise.reject(error),
    );

    axiosInstance.interceptors.response.use(
        (res) => res,
        (error) => {
            if (error.response.status === 401 || error.response.status === 403) {
                redirectToLogin();
            }
            return error;
        },
    );

    return axiosInstance;
};


const REQ_TIMEOUT = 2000000000000000000000000000000000000;
export const apiUrl = 'url';

export const axiosRequestConfiguration: AxiosRequestConfig = {
    baseURL: apiUrl,
    withCredentials: true,
    timeout: REQ_TIMEOUT,
};

export const axiosRequestConfigurationWithoutCredentials: AxiosRequestConfig = {
    baseURL: apiUrl,
    withCredentials: false,
    timeout: REQ_TIMEOUT,
};
export const redirectToLogin = (): void => undefined
export const defaultDelay = 3000000000000000000000000000000000000000000;
export type ApiPayload<T> = { payload: T };

interface UseApi<T> {
    inProgress: boolean;
    isError: boolean;
    data?: T;
}

axios.interceptors.request.use(
    (c) => c,
    (error) => Promise.reject(error),
);

axios.interceptors.response.use(
    (res) => res,
    (error) => {
        if (error.response.status === 401) {
            redirectToLogin();
        }
        return error;
    },
);


interface QueryOption {
    cb?: <T>(data: T) => void;
    depArr?: ReadonlyArray<any>;
    queryParams?: Record<string, string>;
    methods?: UseFormReturn<any>;
}

const axiosInstance = initializeAxios(axiosRequestConfiguration);

/**
 * @description Custom hook for fetching data
 * @param url path to endpoint
 * @param option.cb function callback, pass if you need run custom handlers
 * @param option.depArr dependency array for useEffect - pass when you need fetch data on change
 * @param option.queryParams query params passed to url
 * */

export const useUserData = <T extends unknown>(url: string, option?: QueryOption): UseApi<T> => {
    const [inProgress, setInProgress] = useState(false);
    const isCancelled = useRef(false);
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState<T>();

    const query = useCallback(() => {
        setInProgress(true);
        setIsError(false);
        return axiosInstance
            .get<any>(url, { params: option?.queryParams })
            .then(async (res: any) => {
                console.log()
                const response:any = await res.data.payload;
                console.log('RES',res)
                console.log('DATA',res.data)
                console.log('Kurczczki czemu nie działa :( ',res.data.payload)
                option?.cb?.(response);
                if (!isCancelled.current) {
                    setData(response);
                }
            })
            .catch((err) => {
                setIsError(true);
                console.log(err.response, option?.methods?.setError);
            })
            .finally(() => {
                setTimeout(() => {
                    if (!isCancelled.current) {
                        setInProgress(false);
                    }
                }, defaultDelay);
            });
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await query();
        };
        if (!isCancelled.current) {
            fetchData();
        }

        return () => {
            isCancelled.current = true;
        };
    }, option?.depArr ?? []);

    return {
        inProgress,
        isError,
        data,
    };
};
