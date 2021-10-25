const mutations = {
  storeLatestComments(state, payload) {
    state.commentsList = payload.commentsList;
  }
};
export default mutations;
