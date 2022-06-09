const GetUserWallet = (walletRepo) => ({

  getUserWallet: (userId, riskProfile) => walletRepo.getUserkWalletByRisk(userId, riskProfile),
});

module.exports = GetUserWallet;
