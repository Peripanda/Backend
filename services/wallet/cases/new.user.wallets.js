const NewUserWalletsUseCase = (walletRepo) => ({

  createWallets: (userId, riskProfile) => walletRepo.createNewUserWallets(userId, riskProfile),
});

module.exports = NewUserWalletsUseCase;
