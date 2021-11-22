import service from '../utils/service';

const baseUrl = '/api/meta';

const metaApi = {};

metaApi.isInstalled = () => {
  return service({
    url: `${baseUrl}/isInstalled`,
    method: 'get'
  });
};

metaApi.getUserProfile = () => {
  return service({
    url: `${baseUrl}/profile`,
    method: 'get'
  });
};

export default metaApi;
