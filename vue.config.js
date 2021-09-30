module.exports = {
  configureWebpack: {
    plugins: [
      require('unplugin-vue-components/webpack')({
        /* options */
      })
    ]
  },
  devServer: {
    https: false,
    proxy: {
      '/api': {
        target: 'http://purr.group',
        changeOrigin: true
      }
    }
  }
};
