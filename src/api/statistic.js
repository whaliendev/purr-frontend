import service from '../utils/service';

const baseUrl = '/api';

const statisticApi = {};

statisticApi.getSummary = () => {
  return service({
    url: `${baseUrl}/statistics`,
    method: 'get'
  });
};

statisticApi.getArticleCommits = (beginDate, endDate) => {
  return service({
    url: `${baseUrl}/article/commit?beginDate=${beginDate}&endDate=${endDate}`,
    method: 'get'
  });
};

export default statisticApi;
