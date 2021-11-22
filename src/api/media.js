import service from '@/utils/service';

const baseUrl = '/api/media';
const mediaApi = {};

mediaApi.uploadMediaActionUrl = `${baseUrl}/upload`;
mediaApi.uploadSingleFile = (data) => {
  return service({
    url: `${baseUrl}/upload`,
    method: 'post',
    data: data
  });
};

mediaApi.getAdminMediasByPaginationWithCondition = (
  status,
  categories,
  locations,
  curPage,
  pageSize
) => {
  return service({
    url: `${baseUrl}/condition`,
    method: 'post',
    data: {
      status,
      categories,
      locations,
      curPage,
      pageSize
    }
  });
};

mediaApi.getAdminMediaDetails = (id) => {
  return service({
    url: `${baseUrl}/detail?id=${id}`,
    method: 'get'
  });
};

mediaApi.getAdminAllCategories = () => {
  return service({
    url: `${baseUrl}/allCategory`,
    method: 'get'
  });
};

mediaApi.getMediaDetailsByLinkName = (linkName) => {
  return service({
    url: `${baseUrl}/details?linkName=${linkName}`,
    method: 'get'
  });
};

export default mediaApi;
