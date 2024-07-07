/* eslint-disable @typescript-eslint/no-var-requires */

import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { IApiResponse } from "@main/types/integration.types";
import {
  closeLoadingDialog,
  showLoadingDialog,
} from "@redux/slices/loading.slice";
import { showMessageDialog } from "@redux/slices/messages.slice";

const config: AxiosRequestConfig = {
  baseURL: 'https://localhost:7186/api/v1',
};

const apiClient = axios.create(config);
let numberOfRequests = 0;

apiClient.interceptors.request.use(async (config) => {
  const { store } = await import("@redux/store");

  const state = store.getState();

  config.headers.Authorization = `Bearer ${state.authentication.accessToken}`;

  if (numberOfRequests === 0) {
    store.dispatch(showLoadingDialog());
  }
  numberOfRequests += 1;
  return config;
});

apiClient.interceptors.response.use(
  async (response) => {
    const { store } = await import("@redux/store");

    numberOfRequests -= 1;
    if (numberOfRequests === 0) {
      store.dispatch(closeLoadingDialog());
    }

    if (response.config.responseType === "blob") {
      return response.data;
    }

    return response.data.result;
  },
  async (err: AxiosError<IApiResponse<unknown>>) => {
    const { store } = await import("@redux/store");

    numberOfRequests -= 1;
    if (numberOfRequests === 0) {
      store.dispatch(closeLoadingDialog());
    }

    if (err.response?.data.errors) {
      store.dispatch(showMessageDialog(err.response?.data?.errors));
    } else {
      store.dispatch(showMessageDialog("Cannot connect to server"));
    }

    return Promise.reject(err);
  }
);

const createQueryString = (query?: Record<string, unknown>) => {
  if (!query) {
    return "";
  }

  return Object.entries(query).reduce((accumulate, [key, value]) => {
    let result =
      accumulate === ""
        ? "?"
        : key && value !== null && value !== undefined
        ? "&"
        : "";

    if (key && value !== null && value !== undefined) {
      result += `${key}=${value}`;
    }

    return accumulate + result;
  }, "");
};

export type NetworkRequest = {
  path: string;
  query?: Record<string, unknown>;
  body?: object | FormData;
  options?: AxiosRequestConfig;
};

const get = <TResult>({ path, query, options }: NetworkRequest) => {
  const queryString = createQueryString(query);

  return apiClient.get<TResult, TResult>(path + queryString, options);
};

const post = <TResult>({ path, query, body, options }: NetworkRequest) => {
  const queryString = createQueryString(query);

  const contentType =
    body instanceof FormData ? "multipart/form-data" : "application/json";

  return apiClient.post<TResult, TResult>(path + queryString, body, {
    headers: {
      "Content-Type": contentType,
    },
    ...options,
  });
};

const patch = <TResult>({ path, query, body, options }: NetworkRequest) => {
  const queryString = createQueryString(query);

  const contentType =
    body instanceof FormData ? "multipart/form-data" : "application/json";

  return apiClient.patch<TResult, TResult>(path + queryString, body, {
    headers: {
      "Content-Type": contentType,
    },
    ...options,
  });
};

const downloadAttachment = async (savedFileName: string) => {
  return get<Blob>({
    path: `/public/${savedFileName}`,
    options: {
      responseType: "blob",
    },
  });
};

export { get, post, patch, downloadAttachment };
