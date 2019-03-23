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
      '/app': {
        target: 'http://jz.test.chimukeji.com',
        changeOrigin: true
      }
    }
  }
}
