const supertest = require('supertest');

const app = require('../bin/server'); // Link to your server file

const request = supertest(app);

describe('Signup User', () => {
  // Hidden for simplicity
  test('POST /signup', async (done) => {
    const response = await request.post('/users/signup').send({
      email: 'elwajas@uc.cl',
      username: 'elwajeiro',
      password: 'wajitrex',
    });

    expect(response.status).toBe(200);
    done();
  });
  // More things come here
});

// describe('User routes', () => {
//   let auth;
//   // eslint-disable-next-line no-unused-vars
//   let user0;
//   const userFields = {
//     firstName: 'Test',
//     lastName: 'User',
//     email: 'test@gmail.com',
//     password: 'testPassword',
//     imageUrl:
//       'https://res.cloudinary.com/digbm7wnh/image/upload/v1626034632/WEB/user_defecto_gtkfkl.png',
//     role: 'superadmin',
//   };

//   beforeAll(async () => {
//     await app.context.orm.sequelize.sync({ force: true }); // se ingresa a bbdd
//     user0 = await app.context.orm.user.create(userFields); // se crea usuario
//     const authResponse = await request // se hace un post con email y clave
//       .post('/api/auth')
//       .set('Content-type', 'application/json')
//       .send({ email: userFields.email, password: userFields.password });
//     auth = authResponse.body;
// la respuesta del body corresponde al access token y el toket_type.
//   });

//   afterAll(async () => {
//     await app.context.orm.sequelize.close();
//   });
//   // Usar
//   describe('GET /api/users/:id', () => {
//     let user; // creo usuario con userData.
//     let response;
//     const userData = {
//       firstName: 'Jon',
//       lastName: 'Snow',
//       birthDate: format(new Date(1993, 2, 22), 'yyyy-MM-dd'),
//       role: 'superadmin',
//     };

//     const authorizedGetUser = (id) =>
//       request
//         .get(`/api/users/${id}`)
//         .auth(auth.access_token, { type: 'bearer' });

//     const unauthorizedGetUser = (id) => request.get(`/api/users/${id}`);

//     beforeAll(async () => {
//       user = await app.context.orm.user.create(userData);
//     });

//     describe('when passed id corresponds to an existing user', () => {
//       beforeAll(async () => {
//         response = await authorizedGetUser(user.id);
//       });

//       test('responds with 200 status code', () => {
//         expect(response.status).toBe(200);
//       });

//       // Mantiene sincronía entre backend y frontend.
//       test('body matches snapshot', () => {
//         expect(response.body).toMatchSnapshot();
//       });
//     });

//     describe('when passed id does not corresponds to any user', () => {
//       test('responds with 404 status code', async () => {
//         response = await authorizedGetUser(user.id * -1);
//         expect(response.status).toBe(404);
//       });
//     });

//     describe('when request is unauthorized because user is not logged in', () => {
//       test('unauthorized get request to endpoint', async () => {
//         response = await unauthorizedGetUser(user.id);
//         expect(response.status).toBe(401);
//       });
//     });
//   });

//   // Test 3
//   describe('GET /api/users/me', () => {
//     // eslint-disable-next-line no-unused-vars
//     let userMe; // creo usuario con userData.
//     let response;
//     const userMeData = {
//       firstName: 'Jonny',
//       lastName: 'Snowy',
//       birthDate: format(new Date(1993, 2, 22), 'yyyy-MM-dd'),
//     };

//     const authorizedGetUserMe = () =>
//       request.get('/api/users/me').auth(auth.access_token, { type: 'bearer' });

//     const unauthorizedGetUserMe = () => request.get('/api/users/me');

//     beforeAll(async () => {
//       userMe = await app.context.orm.user.create(userMeData);
//     });

//     describe('when passed id corresponds to an existing user', () => {
//       beforeAll(async () => {
//         response = await authorizedGetUserMe();
//       });

//       test('responds with 200 status code', () => {
//         expect(response.status).toBe(200);
//       });
//     });

//     describe('when request is unauthorized because user is not logged in', () => {
//       test('unauthorized get request to endpoint', async () => {
//         response = await unauthorizedGetUserMe();
//         expect(response.status).toBe(401);
//       });
//     });
//   });

//   // Test 4
//   describe('GET /api/users/me/preferences', () => {
//     // eslint-disable-next-line no-unused-vars
//     let user; // creo usuario con userData.
//     let response;
//     const userData = {
//       firstName: 'Jonny',
//       lastName: 'Snowy',
//       birthDate: format(new Date(1993, 2, 22), 'yyyy-MM-dd'),
//     };

//     const unauthorizedGetUserMePreferences = () =>
//       request.get('/api/users/me/preferences');

//     beforeAll(async () => {
//       user = await app.context.orm.user.create(userData);
//     });

//     describe('when request is unauthorized because user is not logged in', () => {
//       test('unauthorized get request to endpoint', async () => {
//         response = await unauthorizedGetUserMePreferences();
//         expect(response.status).toBe(401);
//       });
//     });
//   });
//   // Test 7
//   describe('GET /api/users/me/places', () => {
//     // eslint-disable-next-line no-unused-vars
//     let user;
//     let response;
//     // eslint-disable-next-line no-unused-vars
//     let place;
//     // eslint-disable-next-line no-unused-vars
//     let placeRestriction;
//     // eslint-disable-next-line no-unused-vars
//     let preference;
//     // eslint-disable-next-line no-unused-vars
//     let location;

//     const userData = {
//       firstName: 'Jonny',
//       lastName: 'Snowy',
//       birthDate: format(new Date(1993, 2, 22), 'yyyy-MM-dd'),
//     };

//     // eslint-disable-next-line no-unused-vars
//     const locationData = {
//       name: 'Test123',
//     };
//     // eslint-disable-next-line no-unused-vars
//     const preferenceData = {
//       userId: 1,
//       locationId: 1,
//       pagado: true,
//       tipo: ['patines', 'skateboarding', 'escalar'],
//       mascota: true,
//       rodante: true,
//       aforo: 80,
//       horaIngreso: '08:00',
//       horaSalida: '20:00',
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     };
//     // eslint-disable-next-line no-unused-vars
//     const placeData = {
//       name: 'Test Place 123',
//       adress: 'Location Test 123',
//       userId: 1,
//       locationId: 1,
//     };
//     // eslint-disable-next-line no-unused-vars
//     const placeRestrictionData = {
//       placeId: 1,
//       pagado: true,
//       tipo: ['patines', 'skateboarding', 'escalar'],
//       mascota: true,
//       rodante: true,
//       aforo: 80,
//       horaIngreso: '06:00',
//       horaSalida: '22:00',
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     };
//     const unauthorizedGetUserMePreferences = () =>
//       request.get('/api/users/me/preferences');

//     beforeAll(async () => {
//       user = await app.context.orm.user.create(userData);
//     });

//     describe('when request is unauthorized because user is not logged in', () => {
//       test('unauthorized get request to endpoint', async () => {
//         response = await unauthorizedGetUserMePreferences();
//         expect(response.status).toBe(401);
//       });
//     });
//   });

//   // Test 1
//   describe('POST /api/users', () => {
//     const userData = {
//       firstName: 'John',
//       lastName: 'Doe',
//       birthDate: format(new Date(1993, 2, 22), 'yyyy-MM-dd'),
//     };

//     const authorizedPostUser = (body) =>
//       request
//         .post('/api/users')
//         .auth(auth.access_token, { type: 'bearer' })
//         .set('Content-type', 'application/json')
//         .send(body);

//     describe('user data is valid', () => {
//       let response;

//       beforeAll(async () => {
//         response = await authorizedPostUser(userData);
//       });

//       test('responds with 201 (created) status code', () => {
//         expect(response.status).toBe(201);
//       });

//       test('responds with a JSON body type', () => {
//         expect(response.type).toEqual('application/json');
//       });

//       test('response for POST user has an id (user has an id)', () => {
//         expect(response.body.data.id).toBeDefined();
//       });

//       test('post request actually created the given user', async () => {
//         const user = await app.context.orm.user.findByPk(response.body.data.id);
//         const { firstName, lastName, birthDate } = user.dataValues;
//         const sanitizedUser = { firstName, lastName, birthDate };
//         expect(sanitizedUser).toEqual(userData);
//       });
//     });
//   });
// });
