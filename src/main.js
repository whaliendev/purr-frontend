import { createApp } from 'vue';
import router from './router/index';
import store from './store/index.js';

import App from './App';
import './styles/app.scss';
import BaseCard from './components/UI/BaseCard';

import './plugins/fontawesome';
import ElementPlus from 'element-plus';
import logger from './plugins/logger';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const app = createApp(App);

app.use(router);

// make sure no initial transition was applied
app.use(store);

// core library
app.use(ElementPlus);
app.use(logger);

app.component('base-card', BaseCard);
// app.component('setting', Setting);
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
