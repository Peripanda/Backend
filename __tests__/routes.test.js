const request = require('supertest');
const app = require('../bin/server');

describe('Get Health Check from API', () => {
  it('testing root path', async () => {
    const res = await request(app)
      .get('/');
    expect(res.statusCode).toEqual(200);
  });
});
