const router = require('express-promise-router')();

// Cases
const ListUsersUseCase = require('../cases/list.users');
const CreateUsersUseCase = require('../cases/create.user');
const UserUseCase = require('../cases/get.user');
const UpdateBalanceUseCase = require('../cases/change.user.balance');
const SignUpUsersUseCase = require('../cases/user.signup')

// Repos
const UsersRepo = require('../repos/users');

// Models
const UserModel = require('../../../models/users');




/* GET users listing. */
router.get('/', async (req, res) => {
  const listUserUseCase = ListUsersUseCase(UsersRepo(UserModel));

  const user = await listUserUseCase.listUsers();
  res.send(user);
});

/* GET user*/
router.get('/:id', async (req, res) => {
  const userUseCase = UserUseCase(UsersRepo(UserModel));
  
  const user = await userUseCase.getUser(req.params.id);
  res.send(user);
});

router.post('/signup',async (req, res) => {

  const createUsersUseCase = CreateUsersUseCase(UsersRepo(UserModel))
  //En algun un refactory usar userCognito para manejar los errores de las llamadas a cognito
  const signUpUsersUseCase = SignUpUsersUseCase(UsersRepo(UserModel))
  //const signInUsersUseCase = SignInUsersUseCase(UsersRepo(UserModel))
  await signUpUsersUseCase.signUp(req.body.email, req.body.password)
  /*const auth = await signInUsersUseCase.signIn(
      req.body.email,
      req.body.password
  )*/
  console.log(6)
  const user = await createUsersUseCase.createUser(req.body)
  console.log(7)
  res.send({ user })
})

/**
 * PATCH actualiza el balance basado en un delta
 */
router.patch('/:id/balance', async (req, res) => {
  const updateUserBalance = UpdateBalanceUseCase(UsersRepo(UserModel));
  const balance = await updateUserBalance.patchUserBalance(req.params.id, req.body);
  res.send(balance);
});

module.exports = router;

