import { createStore } from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import app from './modules/app';
import comments from './modules/comment';
import pages from './modules/page';
import articles from './modules/article';
import statistics from './modules/statistic';
import menus from './modules/menu';
import links from './modules/link';
import moments from './modules/moment';

import createPersistedState from 'vuex-persistedstate';

const dataState = createPersistedState({
  key: 'purr',
  path: ['user.accessToken', 'user.refreshToken', 'user.accessExpiredTime']
});

const store = createStore({
  modules: {
    app,
    comments,
    pages,
    articles,
    statistics,
    menus,
    links,
    moments
  },
  plugins: [dataState],
  state() {
    return {
      user: {
        accessToken: '',
        refreshToken: '',
        accessExpiredTime: ''
      }
    };
  },
  actions,
  mutations,
  getters
});

export default store;
