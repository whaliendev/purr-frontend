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
import medias from './modules/media';
import tags from './modules/tag';

import createPersistedState from 'vuex-persistedstate';

const dataState = createPersistedState({
  key: 'purr',
  reducer(val) {
    return {
      user: val.user,
      app: val.app,
      menus: val.menus,
      moments: val.moments,
      articles: {
        articleDetails: val.articles.articleDetails
      },
      medias: val.medias
    };
  }
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
    moments,
    medias,
    tags
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
