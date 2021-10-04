import service from '../utils/service';

const baseUrl = '/api';

const appApi = {};

appApi.install = (data) => {
  return service({
    url: `${baseUrl}/install`,
    method: 'post',
    data: data
  });
};

appApi.updateApiUrl = (data) => {
  return service({
    url: `${baseUrl}/meta/apiUrl`,
    method: 'put',
    data: data
  });
};

export default appApi;
