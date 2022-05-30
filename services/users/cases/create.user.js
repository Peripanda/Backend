const BadRequestError = require('../../../errors/BadRequestError');
const ConflictError = require('../../../errors/ConflictError');

const createUserUseCase = (userRepo) => ({
  createUser: async (user) => {
    if (
      !user.email
      || !user.password
    ) {
      throw new BadRequestError('Falta información para crear el usuario');
    }

    const existingUser = await userRepo.getUserByEmail(user.email);

    if (existingUser) {
      throw new ConflictError('El usuario ya existe');
    }

    return userRepo.createUser(user);
  },
});

module.exports = createUserUseCase;
