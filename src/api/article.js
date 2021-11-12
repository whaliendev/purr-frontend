import service from '@/utils/service';

const baseUrl = '/api/article';
const articleApi = {};

articleApi.getLatestAdminArticles = (curPage, fetchNum) => {
  return service({
    url: `${baseUrl}/admin/recent?pageSize=${fetchNum}&curPage=${curPage}`,
    method: 'get'
  });
};

articleApi.getRecommendedArticles = () => {
  return service({
    url: `${baseUrl}/recommend`,
    method: 'get'
  });
};

export default articleApi;
