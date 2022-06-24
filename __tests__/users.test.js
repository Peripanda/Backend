const request = require('supertest');
const app = require('../bin/server');

// Checking signup
describe('Signup', () => {
  it('Happy path signup', async () => {
    expect.assertions(1);
    const res = await request(app).post('/users/signup').send({
      email: `${Math.random().toString(36).slice(2, 7)}@email.com`,
      password: `${Math.random().toString(36).slice(2, 14)}A123!!`,
      username: `${Math.random().toString(36).slice(2, 7)}`,
    });
    await expect(res.statusCode).toEqual(200);
  });
});

// // Check existing user in DB
describe('Get user by ID', () => {
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
    const resTest = await request(app).get(`/users/${id}`);
    expect(resTest.statusCode).toEqual(200);
  });
});

// New user
describe('New user creation and login', () => {
  it('Happy path signin', async () => {
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
    expect(res.statusCode).toEqual(200);
  });
});

// Edit User
describe('Edit user info', () => {
  it('Happy path', async () => {
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

    const resTest = await request(app).patch(`/users/${id}`).send({
      username: `${Math.random().toString(36).slice(2, 7)}`,
      name: `${Math.random().toString(36).slice(2, 7)}`,
      lastname: `${Math.random().toString(36).slice(2, 7)}`,
    });

    expect(resTest.statusCode).toEqual(200);
  });
});

// // User not in DB
describe('Get user by ID', () => {
  it('User not in DB', async () => {
    const res = await request(app).get('/users/10000');
    expect(res.statusCode).toEqual(404);
  });
});
