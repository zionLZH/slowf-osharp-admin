module.exports = {
  publicPath: './',
  devServer: {
    proxy: {
      '/api': {
        target: 'https://www.osharp.org'
      },
      '/UploadFiles': {
        target: 'http://www.osharp.org'
      }
    }
  }
}
