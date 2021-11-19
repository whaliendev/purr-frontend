const mutations = {
  storeLatestTags(state, payload) {
    state.tagList = payload.tagList;
  },
  storePageParams(state, payload) {
    state.pageParams = payload.pageParams;
  }
};

export default mutations;
