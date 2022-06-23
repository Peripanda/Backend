const request = require('supertest');
const app = require('../bin/server');
const marketOrder = require('../helpers/asset.market.order');

describe('Get Assets Price', () => {
  it('testing Buda integration with btc', async () => {
    const res = await request(app).get('/assets/btc');
    expect(res.statusCode).toEqual(200);
  });
});

// describe('Send market order to Buda', () => {
//   it('create Market Order', async () => {
//     const newOrder = marketOrder('0.01', 'btc', 'Ask');
//     expect(newOrder.statusCode).toEqual(404);
//   });
// });
