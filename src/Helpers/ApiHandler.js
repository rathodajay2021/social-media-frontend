import axios from "axios";
import CODES from "./StatusCodes";
import { store } from "Redux/store";
import { logoutUser } from "Redux/Auth/Actions";

import { isIEBrowser } from "Helpers/Utils";
import { showToast } from "Redux/App/Actions";

const METHOD = {
  GET: "get",
  POST: "post",
  PUT: "put",
  PATCH: "patch",
  DELETE: "delete",
};

const BASEURL = "http://192.168.3.163:5000/openxcell/social-media";

// const BASEURL =
//     process.env.REACT_APP_SERVER !== 'local'
//         ? 'http://192.168.3.163:8180/tao_calligraphy/v1/'
//         : process.env.REACT_APP_API_URL;

// CHECK BELOW FOR SAMPLE DATA TO BE PASSED
class Api {
  constructor() {
    this.baseURL = BASEURL;
    this.getAuthenticationInfo();
  }

  getAuthenticationInfo() {
    if (localStorage.getItem("isLoggedIn")) {
      this.isLoggedIn = true;
      this.accessToken = localStorage.getItem("accessToken");
    }
  }

  // URL FOR API
  // REFER SAMPLE JSON AT BOTTOM FOR DATA VALUES
  get(url, data) {
    return new Promise((resolve, reject) => {
      this.api(METHOD.GET, url, data)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  post(url, data) {
    return new Promise((resolve, reject) => {
      this.api(METHOD.POST, url, data)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  put(url, data) {
    return new Promise((resolve, reject) => {
      this.api(METHOD.PUT, url, data)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  patch(url, data) {
    return new Promise((resolve, reject) => {
      this.api(METHOD.PATCH, url, data)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  delete(url, data) {
    return new Promise((resolve, reject) => {
      this.api(METHOD.DELETE, url, data)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  api(method, url, data) {
    return new Promise((resolve, reject) => {
      let axiosConfig = {};
      axiosConfig.method = method;

      axiosConfig.url = this.baseURL + url;

      axiosConfig.headers = this.setHeaders(data);
      if (data) {
        if (data.params) axiosConfig.params = data.params;

        if (data.data) axiosConfig.data = data.data;
      }

      if (isIEBrowser()) {
        if (!axiosConfig.params) axiosConfig.params = {};
        axiosConfig.params.time = new Date().getTime();
      }

      axios(axiosConfig)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          if (error && error.response) {
            if (error.response.status === CODES.NOT_FOUND) {
              if (!data.skipErrorHandling) {
                store.dispatch(
                  showToast(
                    error.response?.data?.message || "Internal Server Error",
                    "error"
                  )
                );
              }
              reject(error);
            } else if (error.response.status === CODES.UNAUTHORIZED) {
              store.dispatch(logoutUser());
            } else if (error.response.status === CODES.SERVER_ERROR) {
              if (data && !data.skipToast)
                store.dispatch(showToast("Internal Server Error", "error"));
              if (data && data.skipErrorHandling) reject(error.response);
            } else {
              if (data && data.skipErrorHandling) resolve(error.response);
              if (data?.returnError) {
                store.dispatch(
                  showToast(
                    error.response?.data?.message || "Internal Server Error",
                    "error"
                  )
                );
                resolve(error?.response);
              } else {
                store.dispatch(
                  showToast(
                    error.response?.data?.message || "Internal Server Error",
                    "error"
                  )
                );
                reject(error);
              }
            }
          } else {
            reject(error);
          }
        });
    });
  }

  setHeaders(data) {
    const { Auth } = store.getState();
    let headers = {};
    headers["accept-language"] = Auth.lang || "en";
    headers["Content-Type"] = "application/json";
    // headers["X-API-KEY"] = process.env.REACT_APP_X_API_KEY;
    headers["DeviceLanguage"] = "en";
    headers["timezone"] = Intl.DateTimeFormat().resolvedOptions().timeZone;

    if (data) {
      if (data.isMultipart) {
        headers["Content-Type"] = "multipart/form-data";
      }

      if (data.headers) {
        for (var key in data.headers) {
          if (data.headers.hasOwnProperty(key)) {
            headers[key] = data.headers[key];
          }
        }
      }
    }

    if (this.isLoggedIn) {
      headers["AccessToken"] = this.accessToken;
      // headers['Authorization'] = `Bearer ${this.accessToken}`;
    }

    return headers;
  }
}

// SAMPLE DATA JSON
/* let sample_data = {

    // ADDITIONAL HEADERS IF REQUIRED
    headers :{
        'Content-type'  : 'xx-urlencode',
    },

    // IF USER ID AND TOKEN SHOULDN'T BE PASSED IN HEADERS (USER FOR AFTER LOGIN API)
    // DEFAULT : FALSE;
    skipAuth    : false,

    // IF Default error handling needs to be overridden
    // DEFAULT : FALSE;
    skipErrorHandling    : false,

    // FOR SENDING FILES OR FORM DATA REQUEST
    isMultipart : true,

    // `PARAMS` ARE THE URL PARAMETERS TO BE SENT WITH THE REQUEST
    params : {
        user_id     : 10,
        name        : "lorem",
        page        : 3,
        sort_by     : 'name'
    },

    // POST DATA
    data : {
        firstName   : 'Lorem',
        lastName    : 'Ipsum'
    },
} */

export default Api;
