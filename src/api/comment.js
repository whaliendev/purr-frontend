import service from '../utils/service';

const baseUrl = '/api/comment';
const commentApi = {};

commentApi.getUnapprovedCommentCount = () => {
  return service({
    url: `${baseUrl}/unapproved`,
    method: 'get'
  });
};

commentApi.getLatestComments = (curPage, fetchNum) => {
  return service({
    url: `${baseUrl}/recent?num=${fetchNum}&page=${curPage}`,
    method: 'get'
  });
};

export default commentApi;
