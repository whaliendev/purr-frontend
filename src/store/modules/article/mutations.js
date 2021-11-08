const mutations = {
  storeLatestArticles(state, payload) {
    state.articlesList = payload.articlesList;
  },
  storePageNum(state, payload) {
    state.pageNum = payload.pageNum;
  }
};

export default mutations;
