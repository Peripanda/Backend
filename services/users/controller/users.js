const router = require('express-promise-router')();

// Cases
const ListUsersUseCase = require('../cases/list.users');
const CreateUsersUseCase = require('../cases/create.user');
const UserUseCase = require('../cases/get.user');
const UpdateBalanceUseCase = require('../cases/change.user.balance');
const SignUpUsersUseCase = require('../cases/user.signup');
const SignInUsersUseCase = require('../cases/user.signin');
const InvestUseCase = require('../cases/user.invest');
const NewUserWalletsCase = require('../../wallet/cases/new.user.wallets');
const GetUserWallets = require('../../wallet/cases/get.user.wallets');
const GetUserWallet = require('../../wallet/cases/get.user.wallet');
const GetUserPortfolioValue = require('../../wallet/cases/get.user.wallet.value');
const GetUserAllPortfoslioValue = require('../../wallet/cases/get.user.all.wallet.value');

// Repos
const UsersRepo = require('../repos/users');
const WalletsRepo = require('../../wallet/repos/wallets');
const PortfoliosRepo = require('../../portfolios/repos/portfolios');

// Models
const UserModel = require('../../../models/users');
const WalletModel = require('../../../models/wallets');
const PortfolioModel = require('../../../models/portfolios');

/* GET users listing. */
router.get('/', async (req, res) => {
  const listUserUseCase = ListUsersUseCase(UsersRepo(UserModel));

  const user = await listUserUseCase.listUsers();
  res.send(user);
});

/* GET user */
router.get('/:id', async (req, res) => {
  const userUseCase = UserUseCase(UsersRepo(UserModel));

  const user = await userUseCase.getUser(req.params.id);
  res.send(user);
});

/* GET User Wallets  by UserID */
router.get('/:id/wallets', async (req, res) => {
  const userWallets = GetUserWallets(WalletsRepo(WalletModel));
  res.send(await userWallets.getUserWallets(req.params.id));
});

/* GET User Wallet by UserID and riskProfile */
router.get('/:id/wallets/:riskProfile', async (req, res) => {
  const userWallets = GetUserWallet(WalletsRepo(WalletModel));
  res.send(await userWallets.getUserWallet(req.params.id, req.params.riskProfile));
});

/* GET User aggreate portfolios value */
router.get('/:id/portfolio-value', async (req, res) => {
  // if req.params.riskProfile != "all"
  const getUserPortfoliosValue = GetUserAllPortfoslioValue(WalletsRepo(WalletModel));
  res.send(await getUserPortfoliosValue.getUserWalletsValue(req.params.id));
});

/* GET User portfolio value */
router.get('/:id/portfolio-value/:riskProfile', async (req, res) => {
  // if req.params.riskProfile != "all"
  const getUserPortfolioValue = GetUserPortfolioValue(WalletsRepo(WalletModel));
  res.send(await getUserPortfolioValue.getUserWalletValue(req.params.id, req.params.riskProfile));
});

router.post('/signup', async (req, res) => {
  const createUsersUseCase = CreateUsersUseCase(UsersRepo(UserModel));
  // En algun un refactory usar userCognito para manejar los errores de las llamadas a cognito
  const signUpUsersUseCase = SignUpUsersUseCase(UsersRepo(UserModel));
  const signInUsersUseCase = SignInUsersUseCase(UsersRepo(UserModel));
  const NewUserWalletsUseCase = NewUserWalletsCase(WalletsRepo(WalletModel));
  await signUpUsersUseCase.signUp(req.body.email, req.body.password);
  const auth = await signInUsersUseCase.signIn(
    req.body.email,
    req.body.password,
  );
  const user = await createUsersUseCase.createUser(req.body);
  await NewUserWalletsUseCase.createWallets(user.id, 'low');
  await NewUserWalletsUseCase.createWallets(user.id, 'medium');
  await NewUserWalletsUseCase.createWallets(user.id, 'high');
  res.send({ user, auth });
});

/** User sign in */
router.post('/signin', async (req, res) => {
  const signInUsersUseCase = SignInUsersUseCase(UsersRepo(UserModel));
  const auth = await signInUsersUseCase.signIn(
    req.body.email,
    req.body.password,
  );
  if (auth) {
    const user = await UsersRepo(UserModel).getUserByEmail(req.body.email);
    res.send({ user, auth });
  }
});

/**
 * PATCH actualiza el balance basado en un delta
 */
router.patch('/:id/balance', async (req, res) => {
  const updateUserBalance = UpdateBalanceUseCase(UsersRepo(UserModel));
  const balance = await updateUserBalance.patchUserBalance(req.params.id, req.body);
  res.send(balance);
});

router.patch('/:id/balance', async (req, res) => {
  const updateUserBalance = UpdateBalanceUseCase(UsersRepo(UserModel));
  const balance = await updateUserBalance.patchUserBalance(req.params.id, req.body);
  res.send(balance);
});

router.post('/:id/invest/:riskProfile', async (req, res) => {
  const investment = InvestUseCase(
    UsersRepo(UserModel),
    WalletsRepo(WalletModel),
    PortfoliosRepo(PortfolioModel),
  );
  const newWalletStatus = await investment.invest(req.params.id, req.params.riskProfile, req.body);
  res.send(newWalletStatus);
});

module.exports = router;
