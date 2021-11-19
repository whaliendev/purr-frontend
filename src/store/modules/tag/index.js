import getters from './getters';
import mutations from '@/store/modules/tag/mutations';
import actions from '@/store/modules/tag/actions';

export default {
  namespaced: true,
  state() {
    return {
      tagOptions: []
    };
  },
  getters,
  mutations,
  actions
};
