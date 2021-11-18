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
  },
  getMomentsByPagination(context, payload) {
    return new Promise((resolve, reject) => {
      // TODO refactor this action to async/await pattern
      momentApi
        .getMomentsByPagination(payload.curPage, payload.fetchNum)
        .then((response) => {
          if (response.data && response.data.success) {
            let momentsList = [];
            context
              .dispatch('checkTokenValidity', null, { root: true })
              .then((data) => {
                if (data) {
                  momentsList = response.data.data.data;
                } else {
                  momentsList = response.data.data.data.filter(
                    (moment) => moment.visible === 1
                  );
                }
                context.commit('storePaginationMomentsList', {
                  momentsList: momentsList.slice(0, 6)
                });
                resolve(response);
              })
              .catch((error) => {
                reject(error);
              });
          }
        });
    });
  }
};

export default actions;
