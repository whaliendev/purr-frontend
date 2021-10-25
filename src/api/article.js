import service from '@/utils/service';

const baseUrl = '/api/article';
const articleApi = {};

articleApi.getLatestArticles = (curPage, fetchNum) => {
  return service({
    url: `${baseUrl}/recent?num=${fetchNum}&page=${curPage}`,
    method: 'get'
  });
};

export default articleApi;
