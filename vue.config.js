module.exports = {
  publicPath: './',
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
        target: 'https://purr.group',
        changeOrigin: true
      }
    }
  }
};
