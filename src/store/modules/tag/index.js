import getters from './getters';
import mutations from '@/store/modules/tag/mutations';
import actions from '@/store/modules/tag/actions';

export default {
  namespaced: true,
  state() {
    return {
      tagOptions: [],
      adminTagsList: {
        data: [],
        timestamp: -1,
        pageParams: {
          curPage: -1,
          pageNum: -1,
          pageSize: -1
        }
      }
    };
  },
  getters,
  mutations,
  actions
};
