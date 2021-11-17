import service from '../utils/service';

const baseUrl = '/api/page';
const pageApi = {};

pageApi.getLatestAdminPages = (curPage, fetchNum) => {
  return service({
    url: `${baseUrl}/admin/recent?curPage=${curPage}&pageSize=${fetchNum}`,
    method: 'get'
  });
};

export default pageApi;
