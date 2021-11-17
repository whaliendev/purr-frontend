import getters from './getters';
import mutations from './mutations';
import actions from './actions';

export default {
  namespaced: true,
  state() {
    return {
      momentsList: [],
      pageParams: {
        curPage: 1,
        pageSize: 10,
        pageNum: 1
      },
      likeMomentsList: []
    };
  },
  getters,
  actions,
  mutations
};
