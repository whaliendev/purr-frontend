import pageApi from '@/api/page';

const actions = {
  getLatestAdminPages(context, payload) {
    return new Promise((resolve, reject) => {
      pageApi
        .getLatestAdminPages(payload.curPage, payload.fetchNum)
        .then((response) => {
          if (response.data && response.data.success) {
            context.commit('storeLatestPages', {
              pagesList: response.data.data.data
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
