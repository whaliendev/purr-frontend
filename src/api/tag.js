import service from '@/utils/service';

const baseUrl = '/api/tag';
const tagApi = {};

tagApi.searchAdminTagsByKeyword = (keyword) => {
  return service({
    url: `${baseUrl}/searchByKeyword?keyword=${keyword}`,
    method: 'get'
  });
};

tagApi.getAdminTagsByPagination = (curPage, pageSize) => {
  return service({
    url: `${baseUrl}/admin/recent?curPage=${curPage}&pageSize=${pageSize}`,
    method: 'get'
  });
};

export default tagApi;
