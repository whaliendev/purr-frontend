import appApi from '../../../api/app';

const actions = {
  install(context, installData) {
    // console.log(installData);
    return new Promise((resolve, reject) => {
      appApi
        .install(installData)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  updateApiUrl(context, settingsData) {
    return new Promise((resolve, reject) => {
      appApi
        .updateApiUrl(settingsData)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
};
export default actions;
