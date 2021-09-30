import service from '../utils/service';

const baseUrl = '/api';

const appApi = {};

appApi.install = (data) => {
  return service({
    url: `${baseUrl}/install`,
    method: 'post',
    data: data,
  });
};

export default appApi;
