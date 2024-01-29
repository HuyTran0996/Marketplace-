import axios from "axios";
import { BASE_URL, BASE_URL123 } from "./config";

const apiService = axios.create({
  baseURL: BASE_URL,
});

apiService.interceptors.request.use(
  (request) => {
    console.log("Start request", request);
    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", error);
  }
);

apiService.interceptors.response.use(
  (response) => {
    console.log("Response", response);

    return response;
  },
  function (error) {
    console.log("RESPONSE ERROR", error);
    console.log("RESPONSE ERROR", error.response.data.error);

    return Promise.reject(error);

    // return errorName;
  }
);
///////////////////////////////////////////////

const apiServiceLogin = axios.create({
  baseURL123: BASE_URL123,
});

apiServiceLogin.interceptors.request.use(
  (request) => {
    console.log("Start Login request", request);
    return request;
  },
  function (error) {
    console.log("REQUEST Login ERROR", error);
  }
);

apiServiceLogin.interceptors.response.use(
  (response) => {
    console.log("Response Login", response);

    return response;
  },
  function (error) {
    console.log("RESPONSE Login ERROR", error);
    console.log("RESPONSE Login ERROR", error.response.data.error);

    return Promise.reject(error);

    // return errorName;
  }
);

export { apiService, apiServiceLogin };
