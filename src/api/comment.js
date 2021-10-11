import service from '../utils/service';

const baseUrl = '/api/comment';
const commentApi = {};

commentApi.getUnapprovedCommentCount = () => {
  return service({
    url: `${baseUrl}/unapproved`,
    method: 'get'
  });
};

export default commentApi;
