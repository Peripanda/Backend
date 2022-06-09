const request = require('supertest');
const app = require('../bin/server');

// Checking signup for existing user in DB
describe('Signup', () => {
  it('Happy path signup', async () => {
    const res = await request(app).post('/users/signup').send({
      email: 'dave12@email.com',
      password: '.Abcdejkbd1!!!!!',
      username: 'dfdiaz33',
    });
    expect(res.statusCode).toEqual(200);
  });
});

// // User in DB
// describe('Get user by ID', () => {
//   it('Health check', async () => {
//     const res = await request(app).get('/users/1');
//     expect(res.statusCode).toEqual(500);
//   });
// });

// New user
// describe('New user creation and login', () => {
//   const userData = {
//     email: 'elwajas1@uc.cl',
//     username: 'elwajeiro1',
//     password: 'wajitrex1',
//   };

//   beforeAll(async (createUserUseCase) => {
//     const user = await createUserUseCase(userData);
//   });

//   it('Happy path signup', async () => {
//     const res = await request(app).post('/users/signin').send({
//     email: 'elwajas1@uc.cl',
//     username: 'elwajeiro1',
//     password: 'wajitrex1',
//   });
//     expect(res.statusCode).toEqual(500);
//   });
// });

// describe('Signin', () => {
//   it('Happy path signin', async () => {
//     const res = await request(app).post('/users/signin').send({
//       email: 'joaquinUS130@email.com',
//       password: '.Abcdhjkbd1!!!!!',
//       username: 'jasanchez1',
//     });
//     expect(res.statusCode).toEqual(500);
//   });
// });

// // User not in DB
// describe('Get user by ID', () => {
//   it('Health check', async () => {
//     const res = await request(app).get('/users/100');
//     expect(res.statusCode).toEqual(500);
//   });
// });
