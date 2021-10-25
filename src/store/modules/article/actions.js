import articleApi from "@/api/article";

const actions = {
  getLatestArticles(context, payload) {
    return new Promise((resolve, reject) => {
      articleApi
       .getLatestArticles(payload.curPage, payload.fetchNum)
        .then((response) => {
          if(response.data && response.data.success) {
            context.commit('comments/storeLatestComments', {
              articlesList: response.data.data
            });
          }
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        })
    })
  }
};

export default actions;
