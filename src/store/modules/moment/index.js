import getters from './getters';
import mutations from './mutations';
import actions from './actions';

export default {
  namespaced: true,
  state() {
    return {
      momentsList: [],
      likeMomentsList: []
    };
  },
  getters,
  actions,
  mutations
};
