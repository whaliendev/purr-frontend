import service from '../utils/service';

const baseUrl = '/api/comment';
const commentApi = {};

commentApi.getUnapprovedCommentCount = () => {
  return service({
    url: `${baseUrl}/unapproved`,
    method: 'get'
  });
};

commentApi.getLatestAdminComments = (curPage, fetchNum) => {
  return service({
    url: `${baseUrl}/admin/recent?pageSize=${fetchNum}&curPage=${curPage}`,
    method: 'get'
  });
};

export default commentApi;
