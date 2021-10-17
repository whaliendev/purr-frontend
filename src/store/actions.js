import userApi from '../api/user';
import logger from '../plugins/logger';

const actions = {
  login(context, loginData) {
    return new Promise((resolve, reject) => {
      userApi
        .login(loginData)
        .then((response) => {
          // commit token to local storage
          const data = response.data.data;
          context.commit('storeUserSecrets', {
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            accessExpiredTime: data.accessExpiredTime
          });
          resolve(response);
        })
        .catch((error) => {
          logger.debug(error);
          reject(error);
        });
    });
  },
  refreshToken(context, refreshToken) {
    return new Promise((resolve, reject) => {
      userApi
        .refreshToken(refreshToken)
        .then((response) => {
          const data = response.data.data;
          context.commit('refreshToken', {
            accessToken: data.accessToken
          });
          resolve(response);
        })
        .catch((error) => {
          logger.info(error);
          reject(error);
        });
    });
  }
};

export default actions;
