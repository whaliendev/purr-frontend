import { createStore } from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import app from './modules/app';
import comments from './modules/comments';
import createPersistedState from 'vuex-persistedstate';

const dataState = createPersistedState({
  key: 'purr',
  path: ['user.accessToken', 'user.refreshToken', 'user.accessExpiredTime']
});

const store = createStore({
  modules: {
    app,
    comments
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
