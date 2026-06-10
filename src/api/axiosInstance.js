// src/api/axiosInstance.js

import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  //        ↑
  // every request using this instance automatically
  // gets this URL as a prefix
  // api.get('/products') → https://fakestoreapi.com/products
  // api.get('/products/1') → https://fakestoreapi.com/products/1

  timeout: 8000,
  //        ↑
  // if the API doesn't respond in 8 seconds,
  // axios automatically throws an error
  // without this, requests can hang forever

  headers: {
    'Content-Type': 'application/json',
    //  ↑
    // tells the server we're sending/expecting JSON
    // standard header for REST APIs
  },
});

// ── Request interceptor ────────────────────────────────────────
api.interceptors.request.use(
//   ↑
// interceptors run on EVERY request before it's sent
// useful for adding auth tokens, logging etc.
  (config) => {
    // config = the request configuration object
    // you could add an auth token here:
    // config.headers.Authorization = `Bearer ${token}`;
    // for now we just return it unchanged
    return config;
  },
  (error) => {
    return Promise.reject(error);
    // if request setup fails, forward the error
  }
);

// ── Response interceptor ───────────────────────────────────────
api.interceptors.response.use(
//   ↑
// runs on EVERY response before it reaches your .then()
  (response) => {
    return response;
    // success — just return the response unchanged
  },
  (error) => {
    // ↑ runs when ANY request fails (network error, 404, 500 etc.)

    if (error.response?.status === 404) {
      console.error('Resource not found');
    } else if (error.response?.status === 500) {
      console.error('Server error — try again later');
    } else if (error.code === 'ECONNABORTED') {
      console.error('Request timed out');
      //              ↑
      // ECONNABORTED is the error code axios throws
      // when the timeout (8000ms) is exceeded
    }

    return Promise.reject(error);
    // always forward the error so individual
    // catch blocks in components still receive it
  }
);

export default api;