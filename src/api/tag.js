import service from '../utils/service';

const baseUrl = '/api/tag';
const tagApi = {};

tagApi.getLatestAdminTags = (curPage, fetchNum) => {
  return service({
    url: `${baseUrl}/admin/recent?curPage=${curPage}&pageSize=${fetchNum}`,
    method: 'get'
  });
};

export default tagApi;
