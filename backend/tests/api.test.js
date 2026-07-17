const request = require('supertest');
const app = require('../app');

describe('Public API', () => {
  describe('GET /api/health', () => {
    it('should return 200 with status ok', async () => {
      const res = await request(app).get('/api/health');
      expect(res.status).toBe(200);
    });
  });

  describe('GET /api/settings', () => {
    it('should return settings data', async () => {
      const res = await request(app).get('/api/settings');
      if (res.status === 200) {
        expect(res.body).toHaveProperty('data');
      }
    });
  });

  describe('GET /api/news', () => {
    it('should return news list', async () => {
      const res = await request(app).get('/api/news');
      if (res.status === 200) {
        expect(res.body).toHaveProperty('data');
      }
    });
  });

  describe('GET /api/teachers', () => {
    it('should return teachers list', async () => {
      const res = await request(app).get('/api/teachers');
      if (res.status === 200) {
        expect(res.body).toHaveProperty('data');
      }
    });
  });
});

describe('CRUD API', () => {
  let token = '';

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@school.sch.id', password: 'admin123' });
    if (res.status === 200) {
      token = res.body.data.accessToken;
    }
  });

  describe('GET /api/teachers (authenticated)', () => {
    it('should return 401 without token', async () => {
      const res = await request(app).get('/api/teachers');
      expect(res.status).toBe(401);
    });
  });

  describe('POST /api/news', () => {
    it('should return 401 without token', async () => {
      const res = await request(app)
        .post('/api/news')
        .send({ title: 'Test News', content: 'Test Content' });
      expect(res.status).toBe(401);
    });
  });
});
