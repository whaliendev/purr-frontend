// vue official
import { createApp } from 'vue';
import router from './router/index';
import store from './store/index.js';

// project specifically
import App from './App';
import './styles/app.scss';
import BaseCard from './components/UI/BaseCard';

// plugins
import ElementPlus from 'element-plus';
import logger from './plugins/logger';
import './plugins/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VueMarkdownEditor from './plugins/markdownEditor';
import 'dayjs/locale/zh-cn';
import locale from 'element-plus/lib/locale/lang/zh-cn';

// external styles
import 'tippy.js/dist/tippy.css';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import '@kangc/v-md-editor/lib/plugins/mermaid/mermaid.css';
import '@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';

const app = createApp(App);

app.use(router);

// make sure no initial transition was applied
app.use(store);

// core library
app.use(ElementPlus, { locale });
app.use(logger);
app.use(VueMarkdownEditor);

app.component('base-card', BaseCard);
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
