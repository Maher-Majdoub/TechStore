import { AxiosRequestConfig } from "axios";
import apiClient from "./apiClient";

export interface Response<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}

export interface PostResponse<T> {
  data: T;
}

class ApiService<T> {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getPage = (config: AxiosRequestConfig = {}) => {
    return apiClient
      .get<Response<T>>(`store/${this.endpoint}`, config)
      .then((res) => res.data);
  };

  get = (identifier: string, config: AxiosRequestConfig = {}) => {
    return apiClient
      .get<T>(`/store/${this.endpoint}/${identifier}/`, config)
      .then((res) => res.data);
  };

  post = (data: any, config: AxiosRequestConfig = {}) => {
    return apiClient
      .post<any, PostResponse<T>>(this.endpoint, data, config)
      .then((res) => res.data);
  };
}

export default ApiService;
