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

articleApi.validateArticleArgs = (name, linkName) => {
  return service({
    url: `${baseUrl}/validate`,
    method: 'post',
    data: {
      name,
      linkName
    }
  });
};

articleApi.saveArticleToDraft = (article) => {
  return service({
    url: `${baseUrl}/draft`,
    method: 'put',
    data: {
      id: article.id, // -1 表示新草稿
      name: article.name,
      linkName: article.linkName, // 记得传完整的，后端逻辑有问题
      target: article.target,
      backgroundUrl: article.backgroundUrl,
      author: article.author,
      commentStatus: article.commentStatus,
      pingStatus: article.pingStatus,
      toPing: article.toPing,
      pinged: article.pinged,
      isOriginal: article.isOriginal,
      isPinned: article.isPinned,
      isRecommended: article.isRecommended,
      articleAbstract: article.abstract,
      content: article.content,
      tags: article.tags,
      copyright: article.copyright,
      contract: article.contract,
      copyrightInfo: article.copyrightInfo
    }
  });
};

articleApi.updateOrComposeArticle = (article) => {
  return service({
    url: `${baseUrl}/new`,
    method: 'put',
    data: {
      id: article.id, // 如果为新文章，传-1
      name: article.name,
      linkName: article.linkName, // 记得传完整的，后端逻辑有问题
      target: article.target,
      backgroundUrl: article.backgroundUrl,
      author: article.author,
      commentStatus: article.commentStatus,
      pingStatus: article.pingStatus,
      toPing: article.toPing,
      pinged: article.pinged,
      isOriginal: article.isOriginal,
      isPinned: article.isPinned,
      isRecommended: article.isRecommended,
      articleAbstract: article.abstract,
      content: article.content,
      tags: article.tags,
      copyright: article.copyright,
      contract: article.contract,
      copyrightInfo: article.copyrightInfo
    }
  });
};

articleApi.getAdminArticleDetailById = (id) => {
  return service({
    url: `${baseUrl}/detail?id=${id}`,
    method: 'get'
  });
};

export default articleApi;
