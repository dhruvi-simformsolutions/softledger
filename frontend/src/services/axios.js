import axios from 'axios';
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const instance = axios.create();

// intercept jwt errors
instance.interceptors.response.use(response => response, async error => {
  //in case we want to retry request in the future
  // let originalRequest = error.config
  // console.log("interceptor response", error.response);
  if(error.response && error.response.status === 401) {
    // console.log("invalid token 1");
    // await sleep(7000);
    window.location.reload();
    throw error.response;
  }
  if(error.error && error.error === 'consent_required') {
    // console.log("invalid token 2");
    // await sleep(7000);
    window.location.reload();
    throw error.error;
  }
  if (error.response && error.response.data) {
    throw error.response.data;
  }
  // Do something with response error
  throw error.response;
})

export default instance;