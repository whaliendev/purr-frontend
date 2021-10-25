
const mutations = {
  storeLatestArticles(state, payload) {
    state.articlesList = payload.articlesList;
  }
};

export default mutations;
