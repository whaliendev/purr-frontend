import service from '@/utils/service';

const baseUrl = '/api/media';
const mediaService = {};

mediaService.uploadSingleFile = (data) => {
  return service({
    url: `${baseUrl}/upload`,
    method: 'post',
    data: data
  });
};

mediaService.uploadMediaActionUrl = `${baseUrl}/upload`;

export default mediaService;
