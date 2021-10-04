import userApi from '../api/user';

const actions = {
  login(context, loginData) {
    return new Promise((resolve, reject) => {
      userApi
        .login(loginData)
        .then((response) => {
          // commit token to local
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
};

export default actions;
