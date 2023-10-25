import axios from 'axios';

export const customHeaders: () => { Accept: string } = () => {
  return {
    Accept: 'application/json',
  };
};

const http = axios.create({
  headers: customHeaders(),
});

// Add a request interceptor
http.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    console.log('🔺', error);
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
http.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    console.log('🔺', error.message);
    // ":"Network Error"
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // return Promise.reject(error)
    return Promise.reject(error);
  },
);

export default http;
