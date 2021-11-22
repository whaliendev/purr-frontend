import getters from './getters';
import actions from './actions';
import mutations from './mutations';

export default {
  namespaced: true,
  state() {
    return {
      articlesList: {
        data: [],
        pageParams: {
          curPage: 1,
          pageSize: 10,
          pageNum: 1
        }
      },
      recommendedArticlesList: {
        data: [],
        timestamp: -1
      },
      fgArticlesList: {
        data: [],
        pageParams: {
          curPage: -1,
          pageSize: -1,
          pageNum: -1
        }
      },
      articleDetails: {}
    };
  },
  getters,
  actions,
  mutations
};
