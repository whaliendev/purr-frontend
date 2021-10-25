import commentApi from '@/api/comment';

const actions = {
  getLatestComments(context, payload) {
    return new Promise((resolve, reject) => {
      commentApi
        .getLatestComments(payload.curPage, payload.fetchNum)
        .then((response) => {
          if (response.data && response.data.success) {
            context.commit('storeLatestComments', {
              commentsList: response.data.data
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
