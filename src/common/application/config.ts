import Vue from 'vue'
import router from '../../router'

export const port = 8888
export const pageSize = 8

export const apiBase = location.protocol + '//' + location.host + '/baby/'

export const codeMessage = {
  '-1': "数据库错误,请稍后重试",
  '-2': "失败,参数不正确",
  '-3': "失败,数据已存在",
  '-4': "删除失败",
  '-5': "保存失败",
  '-6': "失败,请上传照片和填写上传者",
  default: '请求失败'
}

export function errorAlert(data: any) {
  let message: String = codeMessage.default
  try {
    if (data.code) {
      codeMessage[data.code]
      message = codeMessage[data.code];
    } else if (data.code == 1 || data.code == 2 || data.code == 3) {
      router.push('/login');
    }
  } finally {
    Vue.prototype.$Message.destroy()
    Vue.prototype.$Message.error(message)
  }
}
/*yyyy-MM-dd hh:mm:ss可根据需求显示到分或秒或其他.调用formatDate(new Date(time), 'yyyy-MM-dd')*/
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  function padLeftZero(str) {
    return ('00' + str).substr(str.length);
  }
  return fmt;
};