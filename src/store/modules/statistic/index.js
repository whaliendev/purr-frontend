import getters from './getters';
import actions from './actions';
import mutations from '@/store/modules/statistic/mutations';

export default {
  namespaced: true,
  state() {
    return {
      commitStatistics: []
    };
  },
  getters,
  actions,
  mutations
};
