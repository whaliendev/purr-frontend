const mutations = {
  storeFocusList(state, payload) {
    const focusList = [];
    for (const focusLink of payload.focusList) {
      focusLink.push(focusLink);
    }
    for (let i = payload.focusList.length; i < 4; i++) {
      focusList.push({
        id: -1,
        name: '',
        url: '',
        linkName: '',
        imageUrl: '',
        target: '',
        description: '',
        visitCount: -1,
        citeCount: -1,
        createTime: Date.now()
      });
    }
    state.focusList = {
      data: focusList,
      timestamp: Date.now()
    };
  },
  storeLatestLinks(state, payload) {
    state.linksList = payload.linksList;
  },
  storePageParams(state, payload) {
    state.pageParams = payload.pageParams;
  }
};

export default mutations;
