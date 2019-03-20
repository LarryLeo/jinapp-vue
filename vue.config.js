const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set('common', resolve('src/common'))
  },
  devServer: {
    proxy: {
      '/musichall': {
        target: 'https://c.y.qq.com/',
        changeOrigin: true
      }
    }
  }
}
