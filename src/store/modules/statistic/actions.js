import statisticApi from '@/api/statistic';

const actions = {
  getArticleCommits(context, payload) {
    return new Promise((resolve, reject) => {
      statisticApi
        .getArticleCommits(payload.beginDate, payload.endDate)
        .then((response) => {
          if (response.data && response.data.success) {
            context.commit('transformCommitStatistics', {
              articleCommits: response.data.data
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
