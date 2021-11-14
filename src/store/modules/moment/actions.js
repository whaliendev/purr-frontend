import momentApi from '@/api/moment';

const actions = {
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
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
};

export default actions;
