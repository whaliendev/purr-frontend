import actions from '@/store/modules/comment/actions';
import getters from '@/store/modules/comment/getters';
import mutations from '@/store/modules/comment/mutations';

export default {
  namespaced: true,
  state() {
    return {
      commentsList: []
    };
  },
  getters,
  actions,
  mutations
};
