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

export default userApi;
