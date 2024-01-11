import apiClient from "./apiClient";

class ApiService<T> {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = () => {
    return apiClient.get<T[]>(this.endpoint).then((res) => res.data);
  };
}

export default ApiService;
