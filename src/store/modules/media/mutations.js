const mutations = {
  storeBGMediaList(state, payload) {
    state.mediaList = {
      data: payload.mediaList,
      timestamp: Date.now()
    };
  },
  storeBGPageParams(state, payload) {
    state.mediaList.pageParams = {
      curPage: payload.curPage,
      pageSize: payload.pageSize,
      pageNum: payload.pageNum
    };
  },
  storeMediaCategories(state, payload) {
    payload.categories.forEach((category) => {
      state.categories.data.push({
        label: category,
        value: category
      });
      state.categories.timestamp = Date.now();
    });
  }
};

export default mutations;
