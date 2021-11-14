import service from '@/utils/service';

const baseUrl = '/api/link';

const linkApi = {};

linkApi.getFocus = () => {
  return service({
    url: `${baseUrl}/focus`,
    method: 'get'
  });
};

export default linkApi;
