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

articleApi.getArticleDetailsByLinkName = (linkName) => {
  return service({
    url: `${baseUrl}/details?linkName=${linkName}`,
    method: 'get'
  });
};

articleApi.getRelatedArticles = (linkName) => {
  return service({
    url: `${baseUrl}/previous-and-next?linkName=${linkName}`,
    method: 'get'
  });
};

export default articleApi;
