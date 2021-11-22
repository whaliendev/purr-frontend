const getters = {
  articlesList: (state) => state.articlesList.data,
  pageParams: (state) => state.articlesList.pageParams,
  fgArticlesList: (state) => state.fgArticlesList.data,
  fgPageParams: (state) => state.fgArticlesList.pageParams,
  recommendedArticlesList: (state) => state.recommendedArticlesList,
  articleDetails: (state) => (linkName) => {
    if (linkName in state.articleDetails) {
      return state.articleDetails[linkName];
    } else {
      return null;
    }
  }
};

export default getters;
