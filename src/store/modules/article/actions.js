import articleApi from '@/api/article';

const actions = {
  getArticlesByPagination(context, payload) {
    return new Promise((resolve, reject) => {
      articleApi
        .getArticlesByPagination(payload.curPage, payload.fetchNum)
        .then((response) => {
          if (response.data && response.data.success) {
            context.commit('storeFGArticlesList', {
              articlesList: response.data.data.data
            });
            context.commit('storeFGPageParams', {
              pageParams: {
                pageSize: response.data.data.pageSize,
                pageNum: response.data.data.pageNum,
                curPage: response.data.data.currentPage
              }
            });
          }
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getLatestAdminArticles(context, payload) {
    return new Promise((resolve, reject) => {
      articleApi
        .getLatestAdminArticles(payload.curPage, payload.fetchNum)
        .then((response) => {
          if (response.data && response.data.success) {
            context.commit('storeLatestArticles', {
              articlesList: response.data.data.data
            });
            context.commit('storePageParams', {
              pageParams: {
                pageSize: response.data.data.pageSize,
                pageNum: response.data.data.pageNum,
                curPage: response.data.data.currentPage
              }
            });
          }
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getRecommendedArticles(context) {
    return new Promise((resolve, reject) => {
      articleApi
        .getRecommendedArticles()
        .then((response) => {
          if (response.data && response.data.success) {
            context.commit('storeRecommendedArticles', {
              articlesList: response.data.data
            });
          }
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getArticleDetailsByLinkName(context, payload) {
    return new Promise((resolve, reject) => {
      articleApi
        .getArticleDetailsByLinkName(payload.linkName)
        .then((response) => {
          if (response.data && response.data.success) {
            context.commit('storeArticleDetails', {
              articleDetails: response.data.data
            });
          }
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // 只允许在本actions中的其他action中调用，不能在组件中dispatch
  validateArticleArgs(context, payload) {
    return new Promise((resolve) => {
      articleApi
        .validateArticleArgs(payload.name, payload.linkName)
        .then((response) => {
          if (response.data && response.data.success) {
            resolve(true);
          }
          resolve(false);
        })
        .catch(() => {
          resolve(false);
        });
    });
  },
  editOrSaveArticleDraft(context, payload) {
    console.log('payload: ', payload);
    return new Promise((resolve, reject) => {
      context
        .dispatch('validateArticleArgs', {
          name: payload.title,
          linkName: payload.linkName
        })
        .then((res) => {
          if (res) {
            const articleToSave = {
              id: payload.id,
              name: payload.title,
              linkName: payload.linkName,
              target: payload.target,
              backgroundUrl: payload.backgroundUrl,
              author: payload.author,
              commentStatus: payload.commentStatus,
              pingStatus: payload.allowPing,
              toPing: '',
              pinged: '',
              isOriginal: payload.originalStatus,
              isPinned: payload.pinnedStatus,
              isRecommended: payload.recommendedStatus,
              articleAbstract: payload.abstract,
              content: payload.content,
              tags: payload.tags.map((tag) => tag.id),
              copyright: payload.attachCopyText,
              contract: payload.ccLicense,
              copyrightInfo: payload.copyrightAttachText,
              createTime: payload.postTime.getTime()
                ? payload.postTime.getTime()
                : Date.now()
            };
            console.log('articleToSave: ', articleToSave);
            articleApi
              .saveArticleToDraft(articleToSave)
              .then((response) => {
                resolve(response.data.success);
              })
              .catch((err) => {
                reject(err);
              });
          } else {
            resolve(false);
          }
        })
        .catch((res) => {
          resolve(res); // 返回值等同于false
        });
    });
  },
  editOrCreateArticle(context, payload) {
    console.log('payload: ', payload);
    return new Promise((resolve, reject) => {
      context
        .dispatch('validateArticleArgs', {
          name: payload.title,
          linkName: payload.linkName
        })
        .then((res) => {
          if (res) {
            const articleToCreate = {
              id: payload.id,
              name: payload.title,
              linkName: payload.linkName,
              target: payload.target,
              backgroundUrl: payload.backgroundUrl,
              author: payload.author,
              commentStatus: payload.commentStatus,
              pingStatus: payload.allowPing,
              toPing: '',
              pinged: '',
              isOriginal: payload.originalStatus,
              isPinned: payload.pinnedStatus,
              isRecommended: payload.recommendedStatus,
              articleAbstract: payload.abstract,
              content: payload.content,
              tags: payload.tags.map((tag) => tag.id),
              copyright: payload.attachCopyText,
              contract: payload.ccLicense,
              copyrightInfo: payload.copyrightAttachText,
              createTime: payload.postTime.getTime()
                ? payload.postTime.getTime()
                : Date.now()
            };
            console.log('articleToCreate: ', articleToCreate);
            articleApi
              .updateOrComposeArticle(articleToCreate)
              .then((response) => {
                resolve(response);
              })
              .catch((err) => {
                reject(err);
              });
          } else {
            resolve(false);
          }
        })
        .catch((res) => {
          resolve(res); // 返回值是false
        });
    });
  },
  getAdminArticleDetailsById(context, payload) {
    return new Promise((resolve, reject) => {
      articleApi
        .getAdminArticleDetailById(payload.id)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
};

export default actions;
