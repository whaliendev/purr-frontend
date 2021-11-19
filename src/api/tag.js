import service from '@/utils/service';

const baseUrl = '/api/tag';
const tagApi = {};

tagApi.searchAdminTagsByKeyword = (keyword) => {
  return service({
    url: `${baseUrl}/searchByKeyword?keyword=${keyword}`,
    method: 'get'
  });
};

export default tagApi;
