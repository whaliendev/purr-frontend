const mutations = {
  storeLatestArticles(state, payload) {
    state.articlesList = payload.articlesList;
  },
  storePageParams(state, payload) {
    state.pageParams = payload.pageParams;
  },
  storeRecommendedArticles(state, payload) {
    state.recommendedArticlesList = {
      data: payload.articlesList,
      timestamp: Date.now()
    };
  }
};

export default mutations;
