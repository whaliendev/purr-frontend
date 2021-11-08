const mutations = {
  storeLatestArticles(state, payload) {
    state.articlesList = payload.articlesList;
  },
  storePageParams(state, payload) {
    state.pageParams = payload.pageParams;
  }
};

export default mutations;
