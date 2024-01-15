import { AxiosRequestConfig } from "axios";
import apiClient from "./apiClient";

export interface Response<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}

class ApiService<T> {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  get = (config: AxiosRequestConfig = {}) => {
    console.log("holla.html", config);
    return apiClient
      .get<Response<T>>(this.endpoint, config)
      .then((res) => res.data);
  };
}

export default ApiService;
