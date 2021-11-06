import service from '@/utils/service';

const baseUrl = '/api/article';
const articleApi = {};

articleApi.getLatestArticles = (curPage, fetchNum) => {
  return service({
    url: `${baseUrl}/admin/recent?pageSize=${fetchNum}&curPage=${curPage}`,
    method: 'get'
  });
};

export default articleApi;
