import getters from './getters';
import actions from './actions';
import mutations from './mutations';

export default {
  namespaced: true,
  state() {
    return {
      articlesList: [],
      pageNum: -1
    };
  },
  getters,
  actions,
  mutations
};
