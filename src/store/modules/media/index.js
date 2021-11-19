import getters from '@/store/modules/media/getters';
import mutations from '@/store/modules/media/mutations';
import actions from '@/store/modules/media/actions';

export default {
  namespaced: true,
  state() {
    return {
      mediaList: {
        data: [],
        timestamp: -1,
        pageParams: {
          curPage: -1,
          pageNum: -1,
          pageSize: -1
        }
      },
      categories: {
        data: [],
        timestamp: -1
      }
    };
  },
  getters,
  mutations,
  actions
};
