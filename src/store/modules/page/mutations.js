const mutations = {
  storeLatestPages(state, payload) {
    state.pagesList = payload.pagesList;
  },
  storePageParams(state, payload) {
    state.pageParams = payload.pageParams;
  }
};

export default mutations;
