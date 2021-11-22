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
    console.log(payload.pageParams);
    state.fgArticlesList.pageParams = payload.pageParams;
  },
  storeRecommendedArticles(state, payload) {
    state.recommendedArticlesList = {
      data: payload.articlesList,
      timestamp: Date.now()
    };
  },
  storeArticleDetails(state, payload) {
    state.articleDetails[payload.articleDetails.linkName] = {
      data: payload.articleDetails,
      timestamp: Date.now()
    };
  }
};

export default mutations;
