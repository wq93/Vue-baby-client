import axios from 'axios';
import {errorAlert} from '../application/config'

let pageFlag: Object = {}
axios.interceptors.request.use(config => {
  pageFlag[config.url] = config.closeAlert
  return config
}, error => {
  return Promise.reject(error)
});

axios.interceptors.response.use(response => {
  if (response.data.code !== 0) {
    errorAlert(response.data)
  }
  return response.data
}, error => {
  if (error.response) {
    pageFlag[error.response.config.url] ?
      console.log(error.response) : errorAlert(error.response.data)
  } else {
    errorAlert(error.data)
  }
  return Promise.reject(error);
});

export default axios
