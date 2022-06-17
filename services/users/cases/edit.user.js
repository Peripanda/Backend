const BadRequestError = require('../../../errors/BadRequestError');
const ConflictError = require('../../../errors/ConflictError');

const editUserUseCase = (userRepo) => ({
  editUser: async (id, user) => {
    if (
      !user
    ) {
      throw new BadRequestError('No hay atributos de usuario para editar');
    }
    if (
      user.birthDate && Number.isNaN(Date.parse(user.birthDate))
    ) {
      throw new BadRequestError('Fecha de nacimiento invalida');
    }
    const existingUser = await userRepo.getUser(id);

    if (!existingUser) {
      throw new ConflictError('El usuario no existe');
    }
    existingUser.set({
      username: user.username ? user.username : existingUser.username,
      name: user.name ? user.name : existingUser.name,
      lastname: user.lastname ? user.lastname : existingUser.lastname,
      birthDate: user.birthDate ? user.birthDate : existingUser.birthDate,
    });
    return existingUser.save();
  },
});

module.exports = editUserUseCase;
