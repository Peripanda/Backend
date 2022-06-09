const walletRepo = (WalletModel) => ({

  listUserWallet: (userId) => WalletModel.findAll({
    where: {
      userId,
    },
  }),
  getUserkWalletByRisk: (userId, riskProfile) => WalletModel.findOne({
    where: {
      userId,
      walletType: riskProfile,
    },
  }),
  createNewUserWallets: (userId, riskProfile) => {
    const newWallet = {
      userId,
      walletType: riskProfile,
      btcQuantity: 0,
      ethQuantity: 0,
      usdcQuantity: 0,
    };
    WalletModel.create(newWallet);
  },
});

module.exports = walletRepo;
