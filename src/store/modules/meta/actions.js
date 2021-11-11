import metaApi from '@/api/meta';

const actions = {
  getUserProfile(context) {
    return new Promise((resolve, reject) => {
      metaApi
        .getUserProfile()
        .then((response) => {
          if (response.data && response.data.success) {
            context.commit('storeUserProfile', {
              userProfile: response.data.data
            });
          }
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
};

export default actions;
