import axios from "axios";
import { getToken } from "../components/base/base";

axios.interceptors.request.use((request) => {
  if (request.url.search("/auth/") === -1) {
    const { token } = getToken("loggedInUser");
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

axios.interceptors.response.use((response) => {
  return response.data;
});
