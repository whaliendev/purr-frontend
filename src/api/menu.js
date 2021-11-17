import service from '@/utils/service';

const baseUrl = '/api/menu';

const menuApi = {};

menuApi.getHomePageMenu = () => {
  return service({
    url: `${baseUrl}/default`,
    method: 'get'
  });
};

export default menuApi;
