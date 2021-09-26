import service from '../utils/service';

const baseUrl = '/api';

const adminApi = {};

adminApi.isInstalled = () => {
  return service({
    url: `${baseUrl}/isInstalled`,
    method: 'get',
  });
};
