import momentApi from '@/api/moment';

const actions = {
  getLatestAdminMoments(context, payload) {
    return new Promise((resolve, reject) => {
      momentApi
        .getLatestAdminMoments(payload.curPage, payload.fetchNum)
        .then((response) => {
          if (response.data && response.data.success) {
            context.commit('storeLatestMoments', {
              momentsList: response.data.data.data
            });
            context.commit('storePageParams', {
              pageParams: {
                pageSize: response.data.data.pageSize,
                pageNum: response.data.data.pageNum,
                curPage: response.data.data.curPage
              }
            });
          }
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
};

export default actions;
