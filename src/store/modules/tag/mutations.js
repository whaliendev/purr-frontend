const mutations = {
  storeKeywordTags(state, payload) {
    state.tagOptions = payload.tagOptions;
  },
  storeAdminTagsList(state, payload) {
    state.adminTagsList.data = payload.tagsList;
    state.adminTagsList.timestamp = Date.now();
  },
  storeAdminTagsPageParams(state, payload) {
    state.adminTagsList.pageParams = {
      curPage: payload.curPage,
      pageSize: payload.pageSize,
      pageNum: payload.pageNum
    };
  }
};

export default mutations;
