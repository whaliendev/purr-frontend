const mutations = {
  storeUserSecrets(state, payload) {
    state.user.accessToken = payload.accessToken;
    state.user.refreshToken = payload.refreshToken;
    state.user.accessExpiredTime = payload.accessExpiredTime;
    console.log('user', state.user);
  },
  refreshToken(state, payload) {
    state.user.accessToken = payload.accessToken;
  }
};

export default mutations;
