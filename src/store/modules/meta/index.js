import actions from '@/store/modules/meta/actions';
import getters from '@/store/modules/meta/getters';
import mutations from '@/store/modules/meta/mutations';

export default {
  namespaced: true,
  state() {
    return {
      userProfile: {}
    };
  },
  getters,
  actions,
  mutations
};
