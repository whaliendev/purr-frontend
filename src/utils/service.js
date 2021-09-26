import axios from 'axios';
import store from '../store';
import { inject } from 'vue';
import { ElMessage, ElNotification } from 'element-plus';

const logger = inject('vuejs3-logger');
const notificationTitle = '啊哦，这里出了点小问题';

const service = axios.create({
  timeout: 10000,
  withCredentials: true
});

function setTokenToHeader(config) {
  const token = store.getters.user.token;
  logger.debug('current token is', token);
  if (token) {
    config.headers['Access-Token'] = token;
  }
}

service.interceptors.request.use(
  (config) => {
    config.baseURL = store.getters.apiUrl;
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
      logger.error(
        `Business error: errorCode: ${data.errorCode}, errorMessage: ${data.errorMsg}`
      );
      ElMessage.error({
        center: true,
        message: data.tip
      });
    }
    return response;
  },
  (error) => {
    const httpCode = error.response.status;
    logger.error(`Request failed, http status code: ${httpCode}`);
    if (axios.isCancel(error)) {
      logger.debug('Cancelled uploading by user. ');
      return Promise.reject(error);
    }

    const status = error.response.status;
    const data = error.response.data;
    let handled = false;
    if (status) {
      if (status === 400) {
        handled = true;
        ElNotification.error({
          title: notificationTitle,
          message: '服务器对你说了no🤪',
          position: 'bottom-right'
        });
      }

      if (status === 401) {
        ElMessage.error({
          title: notificationTitle,
          message: '你的登录状态是无效的，需要重新登录'
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
            `当前请求失败，请求状态码为${status}，可能有用的错误信息: ${
              data || '无'
            }`,
          position: 'bottom-right'
        });
      }
    } else {
      ElNotification.error({
        title: '啊哦，这里出了点小问题',
        message: '貌似你的网络连接出了点问题，请检查一下',
        position: 'bottom-right',
        duration: 1500
      });
    }
    return Promise.reject(error);
  }
);

export default service;
