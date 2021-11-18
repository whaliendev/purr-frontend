import service from '../utils/service';

const baseUrl = '/api/moment';
const momentApi = {};

momentApi.getLatestAdminMoments = (curPage, fetchNum) => {
  return service({
    url: `${baseUrl}/admin/recent?curPage=${curPage}&pageSize=${fetchNum}`,
    method: 'get'
  });
};

momentApi.getMomentsByPagination = (curPage, fetchNum) => {
  return service({
    url: `${baseUrl}/recent?curPage=${curPage}&pageSize=${fetchNum}`,
    method: 'get'
  });
};

export default momentApi;
