const request = require('supertest');
const app = require('../bin/server');

describe('Get Health Check', () => {
  it('Health check', async () => {
    const res = await request(app)
      .get('/');
    expect(res.statusCode).toEqual(200);
  });
});
