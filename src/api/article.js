import service from '@/utils/service';

const baseUrl = '/api/article';
const articleApi = {};

// 前台无鉴权的分页API
articleApi.getArticlesByPagination = (curPage, fetchNum) => {
  return service({
    url: `${baseUrl}/recent?pageSize=${fetchNum}&curPage=${curPage}`,
    method: 'get'
  });
};

// 后台鉴权的分页API
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
