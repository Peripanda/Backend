const request = require('supertest');
const app = require('../bin/server');

describe('Get Assets Price', () => {
  it('testing Buda integration', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
  });
});
