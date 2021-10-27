import axios from 'axios';
import store from '../store';
import { ElMessage, ElNotification } from 'element-plus';
import logger from '../plugins/logger';

const notificationTitle = '糟糕，异常他出现了';

const service = axios.create({
  timeout: 10000,
  withCredentials: true
});

function setTokenToHeader(config) {
  const token = store.getters.user.accessToken;
  if (token) {
    config.headers['Access-Token'] = token;
  }
}

let refreshTask = null;
async function refreshToken(error) {
  const refreshToken = store.getters.user.refreshToken;
  logger.info('refreshToken: ' + refreshToken);
  try {
    if (refreshTask === null) {
      refreshTask = store.dispatch('refreshToken', refreshToken);
      await refreshTask;
    }
  } catch (err) {
    if (
      err.response &&
      err.response.data &&
      err.response.data.data &&
      err.response.data.errorCode === 'A1103'
    ) {
      await reAuth();
    }
  } finally {
    refreshTask = null;
  }
  return reRequest(error);
}

async function reAuth() {
  ElMessage.warning({
    message: '当前登录状态已失效，请重新登录'
  });
  console.log('We will need to navigate to login view in the prod mode');
}

async function reRequest(error) {
  const config = error.response.config;
  setTokenToHeader(config);
  return await axios.request(config);
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
      logger.error(
        `Business error: errorCode: ${data.errorCode}, errorMessage: ${data.errorMsg}`
      );
      ElMessage.error({
        center: true,
        message: data.tip
      });
    } else {
      logger.info(`url: ${response.config.url}`);
      logger.info('data', response.data);
    }
    return response;
  },
  async (error) => {
    logger.warn(error);
    if (axios.isCancel(error)) {
      logger.debug('Cancelled uploading by user. ');
      return Promise.reject(error);
    }

    let handled = false;
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;
      if (status) {
        logger.error(`Request failed, http status code: ${status}`);
        if (status === 400) {
          handled = true;
          ElNotification.error({
            title: notificationTitle,
            message: '服务器对你说了no🤪'
          });
        }

        if (status === 401) {
          if (data.errorCode === 'A1102') {
            const res = refreshToken(error);
            if (res !== error) {
              return res;
            }
          }

          if (data.errorCode === 'A1103') {
            await reAuth();
          }
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
            dangerouslyUseHTMLString: true,
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
