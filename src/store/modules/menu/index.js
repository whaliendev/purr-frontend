import actions from '@/store/modules/menu/actions';
import getters from '@/store/modules/menu/getters';
import mutations from '@/store/modules/menu/mutations';

export default {
  namespaced: true,
  state() {
    return {
      menuList: []
    };
  },
  getters,
  actions,
  mutations
};
