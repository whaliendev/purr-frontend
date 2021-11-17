const mutations = {
  storeLatestMoments(state, payload){
    state.momentsList = payload.momentsList;
  },
  storePageParams(state, payload){
    state.pageParams = payload.pageParams;
  }
};

export default mutations;
