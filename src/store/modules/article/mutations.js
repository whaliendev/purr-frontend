const mutations = {
  storeLatestArticles(state, payload) {
    state.articlesList.data = payload.articlesList;
  },
  storePageParams(state, payload) {
    state.articlesList.pageParams = payload.pageParams;
  },
  storeFGArticlesList(state, payload) {
    state.fgArticlesList.data = payload.articlesList;
  },
  storeFGPageParams(state, payload) {
    state.fgArticlesList.pageParams = {
      pageSize: payload.pageSize,
      pageNum: payload.pageNum,
      curPage: payload.curPage
    };
  },
  storeRecommendedArticles(state, payload) {
    state.recommendedArticlesList = {
      data: payload.articlesList,
      timestamp: Date.now()
    };
  }
};

export default mutations;
