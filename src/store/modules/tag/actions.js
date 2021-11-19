import tagApi from '@/api/tag';

const actions = {
  searchAdminTagsByKeyword(context, payload) {
    return new Promise((resolve, reject) => {
      tagApi
        .searchAdminTagsByKeyword(payload.keyword)
        .then((response) => {
          if (response.data && response.data.success) {
            context.commit('storeKeywordTags', {
              tagsOptions: response.data.data
            });
          }
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
};

export default actions;
