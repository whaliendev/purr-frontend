import articleApi from '@/api/article';

const actions = {
  getLatestAdminArticles(context, payload) {
    return new Promise((resolve, reject) => {
      articleApi
        .getLatestAdminArticles(payload.curPage, payload.fetchNum)
        .then((response) => {
          if (response.data && response.data.success) {
            context.commit('storeLatestArticles', {
              articlesList: response.data.data.data
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
  getRecommendedArticles(context) {
    return new Promise((resolve, reject) => {
      articleApi
        .getRecommendedArticles()
        .then((response) => {
          if (response.data && response.data.success) {
            context.commit('storeRecommendedArticles', {
              articlesList: response.data.data
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
