import axios from "axios";

const apiService = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

apiService.interceptors.request.use(
  (request) => {
    console.log("Start request", request);
    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", error);
    return Promise.reject(error);
  }
);

apiService.interceptors.response.use(
  (response) => {
    console.log("Response", response);

    return response;
  },
  function (error) {
    // console.log("RESPONSE ERROR", error);
    console.log("RESPONSE ERROR", error.response.data.error);

    // return Promise.reject(error);
    return Promise.reject(error.response.data);

    // return errorName;
  }
);

export { apiService };
