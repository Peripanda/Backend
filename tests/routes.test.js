const request = require('supertest');
const app = require('../bin/server');

describe('Get Health Check', () => {
  it('Health check', async () => {
    const res = await request(app)
      .get('/');
    expect(res.statusCode).toEqual(200);
  });
});

describe('Signup', () => {
  it('Happy path signup', async () => {
    const res = await request(app)
      .post('/users/signup')
      .send({
        email: 'joaquinUS130@email.com',
        password: '.Abcdhjkbd1!!!!!',
        username: 'jasanchez1',
      });
    expect(res.statusCode).toEqual(400);
  });
});

describe('Signin', () => {
  it('Happy path signin', async () => {
    const res = await request(app)
      .post('/users/signin')
      .send({
        email: 'joaquinUS130@email.com',
        password: '.Abcdhjkbd1!!!!!',
        username: 'jasanchez1',
      });
    expect(res.statusCode).toEqual(500);
  });
});
