import getters from './getters';
import actions from './actions';
import mutations from './mutations';

export default {
  namespaced: true,
  state() {
    return {
      app: {
        apiUrl: ''
      }
    };
  },
  getters,
  actions: actions,
  mutations: mutations
};
