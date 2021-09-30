import { createStore } from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import app from './modules/app';

const store = createStore({
  modules: {
    app,
  },
  state() {
    return {
      user: {},
    };
  },
  actions,
  mutations,
  getters,
});

export default store;
