import axios from "axios";
import querystring from "qs";
import { USER_LS } from "../constants";
import { getData } from "../utils";

const API_URL = `${process.env.REACT_APP_API_URL}`;

const ApiClient = axios.create({
  baseURL: API_URL,
  timeout: 20000,
  headers: {
    Accept: "application/json",
  },
  paramsSerializer: (params) => querystring.stringify(params),
});

ApiClient.interceptors.request.use(async (req) => {
  const data = getData(USER_LS);

  if (data?.token) req.headers["Authorization"] = `Bearer ${data?.token}`;

  return req;
});
export default ApiClient;
