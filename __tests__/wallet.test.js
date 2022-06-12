const request = require('supertest');
const app = require('../bin/server');

// Positive update
describe('Updating balance with proper amount', () => {
  test('Happy path balance', async () => {
    const res = await request(app).patch('/users/1/balance').send({
      delta: 100,
    });
    expect(res.statusCode).toEqual(200);
  });
});

// Negative update
describe('When taking funds exceeds balance', () => {
  test('Happy path balance', async () => {
    const res = await request(app).patch('/users/1/balance').send({
      delta: -100000000000,
    });
    expect(res.statusCode).toEqual(400);
  });
});
