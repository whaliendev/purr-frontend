import service from '../utils/service';

const baseUrl = '/api';
const userApi = {};

userApi.login = (data) => {
  return service({
    method: 'post',
    data: data,
    url: `${baseUrl}/login`
  });
};

userApi.refreshToken = (refreshToken) => {
  return service({
    method: 'get',
    url: `${baseUrl}/token/refresh`,
    headers: {
      'Access-Token': refreshToken
    }
  });
};

userApi.checkTokenValidity = (token) => {
  return service({
    method: 'post',
    url: `${baseUrl}/token/check`,
    data: {
      token: token
    }
  });
};

export default userApi;
