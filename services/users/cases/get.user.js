const NotFoundRequestError = require('../../../errors/NotFoundError');

const UserUseCase = (userRepo) => ({

  getUser: async (id) => {
    const user = await userRepo.getUser(id);
    if (user === null) {
      throw new NotFoundRequestError('Usuario no encontrado');
    }
    return user;
  },
});

module.exports = UserUseCase;
