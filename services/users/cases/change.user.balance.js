const NotFoundRequestError = require('../../../errors/NotFoundError');
const NegativeBalanceNotAllowed = require('../../../errors/NegativeBalanceNotAllowed');
const BadRequest = require('../../../errors/BadRequestError');

const ChangeUserBalanceUseCase = (userRepo) => ({
  patchUserBalance: async (id, body) => {
    if (!body.delta) {
      throw new BadRequest('El request debe contener delta');
    }
    const user = await userRepo.getUser(id);
    if (user === null) {
      throw new NotFoundRequestError('Usuario no encontrado');
    }
    if (user.balance + body.delta < 0) {
      throw new NegativeBalanceNotAllowed('El retiro excede el balance disponible del usuario');
    }
    const updatedUser = await user.set({
      balance: user.balance + body.delta,
    });
    updatedUser.save();
    return { userId: id, balance: user.balance };
  },
});

module.exports = ChangeUserBalanceUseCase;
