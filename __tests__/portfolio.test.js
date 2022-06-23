const request = require('supertest');
const app = require('../bin/server');

/* GET User aggregate portfolios value */
describe('Get portfolio values', () => {
  it('Health check', async () => {
    const newEmail = `${Math.random().toString(36).slice(2, 7)}@email.com`;
    const newPassword = `${Math.random().toString(36).slice(2, 14)}A123!!`;
    const newUsername = `${Math.random().toString(36).slice(2, 7)}`;
    await request(app).post('/users/signup').send({
      email: newEmail,
      password: newPassword,
      username: newUsername,
    });
    const res = await request(app).post('/users/signin').send({
      email: newEmail,
      password: newPassword,
      username: newUsername,
    });
    const { id } = res.body.user;
    const resTest = await request(app).get(`/users/${id}/portfolio-value`);
    expect(resTest.statusCode).toEqual(200);
  });
});

/* GET User aggregate portfolios value */
describe('Get Profit value', () => {
  it('Health check', async () => {
    const newEmail = `${Math.random().toString(36).slice(2, 7)}@email.com`;
    const newPassword = `${Math.random().toString(36).slice(2, 14)}A123!!`;
    const newUsername = `${Math.random().toString(36).slice(2, 7)}`;
    await request(app).post('/users/signup').send({
      email: newEmail,
      password: newPassword,
      username: newUsername,
    });
    const res = await request(app).post('/users/signin').send({
      email: newEmail,
      password: newPassword,
      username: newUsername,
    });
    const { id } = res.body.user;
    const resTest = await request(app).get(`/users/${id}/profit`);
    expect(resTest.statusCode).toEqual(200);
  });
});
