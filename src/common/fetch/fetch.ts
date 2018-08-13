import axios from './_axios'
import {apiBase} from '../application/config'

export const $get = (url: String, params: any, closeAlert = false) => {
  return axios({
    method: 'get',
    params,
    closeAlert,
    url: `${apiBase}${url}`,
  });
}
export const $post = (url, params, closeAlert = false) => {
  return axios({
    method: 'post',
    url: `${apiBase}${url}`,
    closeAlert,
    data: params,
  })
}
export const $uploadFile = (url, params, closeAlert = false) => {
  return axios({
    method: 'post',
    closeAlert,
    url: `${apiBase}${url}`,
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
export const $put = (url, params, closeAlert = false) => {
  return axios({
    method: 'put',
    closeAlert,
    url: `${apiBase}${url}`,
    data: params,
  });
}
export const $delete = (url, params, closeAlert = false) => {
  return axios({
    method: 'delete',
    closeAlert,
    data: params,
    url: `${apiBase}${url}`,
  });
}

