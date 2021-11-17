const getters = {
  articlesList: (state) => state.articlesList.data,
  pageParams: (state) => state.articlesList.pageParams,
  fgArticlesList: (state) => state.fgArticlesList.data,
  fgPageParams: (state) => state.fgArticlesList.pageParams,
  recommendedArticlesList: (state) => state.recommendedArticlesList
};

export default getters;
