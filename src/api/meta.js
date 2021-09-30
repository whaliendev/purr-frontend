import service from '../utils/service';

const baseUrl = '/api/meta';

const metaApi = {};

metaApi.isInstalled = () => {
  return service({
    url: `${baseUrl}/isInstalled`,
    method: 'get'
  });
};

export default metaApi;
