import mutations from './mutations';
import getters from './getters';
import actions from './actions';

export default {
  namespaced: true,
  state() {
    return {
      focusList: {
        data: [],
        timestamp: -1
      },
      linksList: [],
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
