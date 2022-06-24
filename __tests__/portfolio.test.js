const request = require('supertest');
const app = require('../bin/server');

/* GET User aggregate portfolios value */
describe('Get portfolio values', () => {
  it('Health check', async () => {
    jest.setTimeout(20000);
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

/* User Invest */
describe('User invest', () => {
  it('Not enough fonds in wallet', async () => {
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
    await request(app).patch(`/users/${id}/balance`).send({
      delta: 100,
    });
    const resTest = await request(app).post(`/users/${id}/invest/medium`).send({
      investment: 1,
    });
    expect(resTest.statusCode).toEqual(400);
  });
});

/* User Invest */
describe('User invest', () => {
  it('Happy Invest with portfolio medium', async () => {
    jest.setTimeout(10000);
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
    await request(app).patch(`/users/${id}/balance`).send({
      delta: 10000,
    });
    const resTest = await request(app).post(`/users/${id}/invest/medium`).send({
      investment: 5001,
    });
    expect(resTest.statusCode).toEqual(200);
  });
});

/* User Withdraw */
describe('User Withdraw', () => {
  it('Cannot Withdraw from portfolio because insufficient funds', async () => {
    jest.setTimeout(10000);
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
    await request(app).patch(`/users/${id}/balance`).send({
      delta: 10000,
    });
    const resTest = await request(app).post(`/users/${id}/withdraw/medium`).send({
      withdraw: 5001,
    });
    expect(resTest.statusCode).toEqual(400);
  });
});

/* User Withdraw */
describe('User Withdraw', () => {
  it('Withdraw from portfolio', async () => {
    jest.setTimeout(10000);
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
    await request(app).patch(`/users/${id}/balance`).send({
      delta: 100000,
    });
    await request(app).post(`/users/${id}/invest/medium`).send({
      investment: 30000,
    });
    const wallet = await request(app).get(`/users/${id}/wallets`);
    // eslint-disable-next-line no-console
    console.log(`USER WALLET IS: ${JSON.stringify(wallet)}`);
    const resTest = await request(app).post(`/users/${id}/withdraw/medium`).send({
      withdraw: 12000,
    });
    expect(resTest.statusCode).toEqual(200);
  });
});
