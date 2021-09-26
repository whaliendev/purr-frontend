import { createApp } from 'vue';
import App from './App';
import router from './router/index';
import store from './store/index.js';
import './styles/app.scss';
import 'element-plus/theme-chalk/src/index.scss';
import ElementPlus from 'element-plus';
import loggerOptions from './config/logger';
import VueLogger from 'vuejs3-logger';

const app = createApp(App);

app.use(router);

router.isReady().then(() => {
  app.use(store);

  // core library
  app.use(ElementPlus);
  app.use(VueLogger, loggerOptions);
  app.mount('#app');
});
