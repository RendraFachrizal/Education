import api from './api';

const uploadService = {
  async uploadImage(file, module = 'general') {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await api.post(`/upload?module=${module}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data.data;
  },

  async uploadDocument(file, module = 'general') {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await api.post('/upload/document', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data.data;
  },

  async deleteFile(filename) {
    const { data } = await api.delete(`/upload/${filename}`);
    return data;
  }
};

export default uploadService;
