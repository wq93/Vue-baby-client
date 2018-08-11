import {apiBase} from './config'

export function $_get(fetchUrl: String) {
  let url = `${apiBase}/${fetchUrl}`
  return new Promise((resolve, reject) => {
    fetch(url).then(res => {
      resolve(res)
    }, error => {
      reject(error)
    })
  })
}

export function $_post(fetchUrl: String) {
  let url = `${apiBase}/${fetchUrl}`
  return new Promise((resolve, reject) => {
    fetch(url).then(res => {
      resolve(res)
    }, error => {
      reject(error)
    })
  })
}