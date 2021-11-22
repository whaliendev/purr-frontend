import mediaApi from '@/api/media';

const actions = {
  getAdminMediasByPaginationWithCondition(context, payload) {
    return new Promise((resolve, reject) => {
      mediaApi
        .getAdminMediasByPaginationWithCondition(
          payload.status,
          payload.categories,
          payload.locations,
          payload.curPage,
          payload.pageSize
        )
        .then((response) => {
          if (response.data && response.data.success) {
            context.commit('storeBGMediaList', {
              mediaList: response.data.data.data
            });
            context.commit('storeBGPageParams', {
              pageNum: response.data.data.pageNum,
              pageSize: response.data.data.pageSize,
              curPage: response.data.data.currentPage
            });
          }
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getAdminAllCategories(context) {
    return new Promise((resolve, reject) => {
      mediaApi
        .getAdminAllCategories()
        .then((response) => {
          if (response.data && response.data.success) {
            context.commit('storeMediaCategories', {
              categories: response.data.data
            });
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  uploadSingleFile(context, payload) {
    return new Promise((resolve, reject) => {
      mediaApi
        .uploadSingleFile(payload.data)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getMediaDetailsByLinkName(context, payload) {
    return new Promise((resolve, reject) => {
      mediaApi
        .getMediaDetailsByLinkName(payload.linkName)
        .then((response) => {
          if (response.data && response.data.success) {
            resolve(true);
          }
          resolve(false);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
};

export default actions;
