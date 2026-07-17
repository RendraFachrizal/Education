import api from './api';

export const teacherService = {
  async getAll(params) {
    const { data } = await api.get('/teachers', { params });
    return data;
  },
  async getById(id) {
    const { data } = await api.get(`/teachers/${id}`);
    return data;
  },
  async create(formData) {
    const { data } = await api.post('/teachers', formData);
    return data;
  },
  async update(id, formData) {
    const { data } = await api.put(`/teachers/${id}`, formData);
    return data;
  },
  async delete(id) {
    const { data } = await api.delete(`/teachers/${id}`);
    return data;
  }
};
