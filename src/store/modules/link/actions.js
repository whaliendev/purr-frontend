import linkApi from '@/api/link';

const actions = {
  getFocusList(context) {
    return new Promise((resolve, reject) => {
      linkApi
        .getFocus()
        .then((response) => {
          if (response.data && response.data.success) {
            context.commit('storeFocusList', {
              focusList: response.data.data
            });
          }
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getLatestAdminLinks(context, payload) {
    return new Promise((resolve, reject) => {
      linkApi
        .getLatestAdminLinks(payload.curPage, payload.fetchNum)
        .then((response) => {
          if (response.data && response.data.success) {
            context.commit('storeLatestLinks', {
              linksList: response.data.data.data
            });
            context.commit('storePageParams', {
              pageParams: {
                pageSize: response.data.data.pageSize,
                pageNum: response.data.data.pageNum,
                curPage: response.data.data.curPage
              }
            })
          }
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        })
    });
  }
};

export default actions;
