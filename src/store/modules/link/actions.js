import linkApi from '@/api/link';

const actions = {
  getFocusList(context) {
    return new Promise((resolve, reject) => {
      linkApi
        .getFocus()
        .then((response) => {
          if (response.data && response.data.success) {
            context.commit('storeFocusList', {
              focusList: response.data.data
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
