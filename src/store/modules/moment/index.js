import getters from './getters';
import actions from './actions';
import mutations from './mutations';

export default {
  namespaced: true,
  state() {
    return {
      momentsList: [],
      pageParams: {
        curPage: 1,
        pageSize: 10,
        pageNum: 1
      }
    };
  },
  getters,
  actions,
  mutations
};
