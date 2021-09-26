import { createStore } from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import appModule from './modules/app';

const store = createStore({
  modules: {
    appModule,
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
