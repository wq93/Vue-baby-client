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