import service from '../utils/service';

const baseUrl = '/api';

const statisticApi = {};

statisticApi.getSummary = () => {
  return service({
    url: `${baseUrl}/statistics`,
    method: 'get'
  });
};

export default statisticApi;
