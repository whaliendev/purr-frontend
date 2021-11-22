import tagApi from '@/api/tag';

const actions = {
  searchAdminTagsByKeyword(context, payload) {
    return new Promise((resolve, reject) => {
      tagApi
        .searchAdminTagsByKeyword(payload.keyword)
        .then((response) => {
          if (response.data && response.data.success) {
            context.commit('storeKeywordTags', {
              tagsOptions: response.data.data
            });
          }
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getAdminTagsByPagination(context, payload) {
    return new Promise((resolve, reject) => {
      tagApi
        .getAdminTagsByPagination(payload.curPage, payload.pageSize)
        .then((response) => {
          if (response.data && response.data.success) {
            context.commit('storeAdminTagsList', {
              tagsList: response.data.data.data
            });
            context.commit('storeAdminTagsPageParams', {
              curPage: response.data.data.currentPage,
              pageSize: response.data.data.pageSize,
              pageNum: response.data.data.pageNum
            });
          }
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
};

export default actions;
