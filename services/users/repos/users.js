const userRepo = (UserModel) => ({

  listUsers: (params) => UserModel.findAll(params),

  getUser: (id) => UserModel.findByPk(id),

  getUserByEmail: (email) => UserModel.findOne({ where: { email } }),

  createUser: (user) => UserModel.create(user),
});

module.exports = userRepo;
