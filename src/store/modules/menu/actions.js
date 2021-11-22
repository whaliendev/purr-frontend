import menuApi from '@/api/menu';

const actions = {
  getHomePageMenu(context) {
    return new Promise((resolve, reject) => {
      menuApi
        .getHomePageMenu()
        .then((response) => {
          if (response.data && response.data.success) {
            context.commit('storeHomePageMenu', {
              menuList: response.data.data
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
