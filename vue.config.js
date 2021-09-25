module.exports = {
  configureWebpack: {
    plugins: [
      require("unplugin-vue-components/webpack")({
        /* options */
      }),
    ],
  },
  // css: {
  //   loaderOptions: {
  //     sass: {
  //       prependData: `@import "@/styles/app.scss";`
  //     }
  //   }
  // }
};
