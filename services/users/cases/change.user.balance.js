const NotFoundRequestError = require('../../../errors/NotFoundError');
const NegativeBalanceNotAllowed = require('../../../errors/NegativeBalanceNotAllowed');

const ChangeUserBalanceUseCase = (userRepo) => ({
  patchUserBalance: async (id, body) => {
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
