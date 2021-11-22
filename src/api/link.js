import service from '@/utils/service';

const baseUrl = '/api/link';

const linkApi = {};

linkApi.getFocus = () => {
  return service({
    url: `${baseUrl}/focus`,
    method: 'get'
  });
};

linkApi.getLatestAdminLinks = (curPage, fetchNum) => {
  return service({
    url: `${baseUrl}/admin/recent?curPage=${curPage}&pageSize=${fetchNum}`,
    method: 'get'
  });
}

export default linkApi;
