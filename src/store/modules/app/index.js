import getters from './getters';
import actions from './actions';
import mutations from './mutations';

export default {
  namespace: true,
  state() {
    return {
      apiUrl: '',
    };
  },
  getters,
  actions,
  mutations,
}