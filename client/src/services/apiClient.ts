import axios from "axios";

const BASE_URL = "https://server-kb9n.zeet-maherayari24-te.zeet.app/";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: "",
  },
});

export default apiClient;
