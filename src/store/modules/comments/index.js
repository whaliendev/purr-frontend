import actions from "@/store/modules/comments/action";
import getters from "@/store/modules/comments/getters";
import mutations from "@/store/modules/comments/mutation";

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
