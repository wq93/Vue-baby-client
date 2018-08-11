module.exports = {
  lintOnSave: false,
  devServer: {
    port: 8888,
    proxy: {
      '/baby/*': {
        // 目标 API 地址
        target: 'http://localhost:3000/',
        // 如果要代理 websockets
        ws: true,
        // 将主机标头的原点更改为目标URL
        changeOrigin: false
      }
    }
  }
}