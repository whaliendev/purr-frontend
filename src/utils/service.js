import axios from 'axios';
import store from '../store';
// import { inject } from 'vue';
import { ElMessage, ElNotification } from 'element-plus';

// const logger = inject('vuejs3-logger');
// console.log(logger);
const notificationTitle = '糟糕，异常他出现了';

const service = axios.create({
  timeout: 10000,
  withCredentials: true
});

function setTokenToHeader(config) {
  const token = store.getters.user.token;
  // logger.debug('current token is', token);
  if (token) {
    config.headers['Access-Token'] = token;
  }
}

service.interceptors.request.use(
  (config) => {
    config.baseURL = store.getters['app/apiUrl'];
    setTokenToHeader(config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    const data = response.data;
    if (data.success === false) {
      // logger.error(
      //   `Business error: errorCode: ${data.errorCode}, errorMessage: ${data.errorMsg}`
      // );
      ElMessage.error({
        center: true,
        message: data.tip
      });
    }
    console.log(response);
    return response;
  },
  (error) => {
    // logger.debug(error);
    console.log(error.response);
    if (axios.isCancel(error)) {
      // logger.debug('Cancelled uploading by user. ');
      return Promise.reject(error);
    }

    let handled = false;
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;
      if (status) {
        console.log(error.response);
        console.log(error.response.request);
        // logger.error(`Request failed, http status code: ${status}`);
        console.log(status);
        if (status === 400) {
          handled = true;
          ElNotification.error({
            title: notificationTitle,
            message: '服务器对你说了no🤪'
          });
        }

        if (status === 401) {
          ElMessage.error({
            title: notificationTitle,
            message: '你的登录状态是无效的，需要重新登录'
          });
          handled = true;
        }

        if (status === 404) {
          ElMessage.error({
            title: notificationTitle,
            message: '貌似你的服务器出了点小问题，请检查一下服务器后重试'
          });
          handled = true;
        }

        if (status === 500) {
          // TODO
          handled = true;
        }

        if (!handled) {
          ElNotification.error({
            title: notificationTitle,
            message:
              data.tip ||
              `当前请求失败，响应状态码为${status}，可能有用的错误信息: ${
                data || '无'
              }`
          });
        }
      }
    } else {
      ElNotification.error({
        title: notificationTitle,
        message: '貌似你的网络连接出了点问题，请检查之后重试',
        // position: 'bottom-right',
        duration: 5000,
        offset: 20
      });
    }
    return Promise.reject(error);
  }
);

export default service;
