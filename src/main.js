import { createApp } from "vue";
import App from "./App";
import router from "./router/index";
import store from "./store/index.js";
import "./styles/app.scss";
import "element-plus/theme-chalk/src/index.scss";
import ElementPlus from "element-plus";

const app = createApp(App);

app.use(router);

router.isReady().then(() => {
  app.use(store);
  app.use(ElementPlus);
  app.mount("#app");
});
