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

  getPage = (page: number = 1) => {
    return apiClient
      .get<Response<T>>(this.endpoint, { params: { page: page } })
      .then((res) => res.data);
  };
}

export default ApiService;
