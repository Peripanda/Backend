const request = require('supertest');
const app = require('../bin/app');

describe.skip('Get Health Check', () => {
  test('Health check', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
  });
});
