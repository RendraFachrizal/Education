import api from './api';

export const newsService = {
  async getAll(params) {
    const { data } = await api.get('/news', { params });
    return data;
  },
  async getById(id) {
    const { data } = await api.get(`/news/${id}`);
    return data;
  },
  async create(formData) {
    const { data } = await api.post('/news', formData);
    return data;
  },
  async update(id, formData) {
    const { data } = await api.put(`/news/${id}`, formData);
    return data;
  },
  async delete(id) {
    const { data } = await api.delete(`/news/${id}`);
    return data;
  }
};
