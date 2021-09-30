const getters = {
  apiUrl: (state) => {
    if (state.app.apiUrl) {
      return state.app.apiUrl;
    }
    return `${window.location.protocol}//${window.location.host}`;
  }
};

export default getters;
