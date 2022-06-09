const GetUserWallets = (walletRepo) => ({

  getUserWallets: (userId) => walletRepo.listUserWallet(userId),
});

module.exports = GetUserWallets;
