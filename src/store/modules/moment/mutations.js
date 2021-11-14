const mutations = {
  storePaginationMomentsList(state, payload) {
    state.momentsList = payload.momentsList;
  },
  storeMomentLikes(state, payload) {
    if (!state.likeMomentsList.includes(payload.id))
      state.likeMomentsList.push(payload.id);
  },
  removeMomentLikes(state, payload) {
    if (state.likeMomentsList.includes(payload.id)) {
      state.likeMomentsList = state.likeMomentsList.filter(
        (momentId) => momentId !== payload.id
      );
      console.log(state.likeMomentsList);
    }
  }
};
export default mutations;
