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

export default userApi;
