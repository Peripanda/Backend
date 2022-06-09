const getAssetPrice = require('../../../helpers/get.asset.price');

const GetUserWalletsValue = (walletRepo) => ({

  getUserWalletsValue: async (userId) => {
    let value = 0;
    const wallets = await walletRepo.listUserWallet(userId);
    const btcPrice = await getAssetPrice('btc');
    const ethPrice = await getAssetPrice('eth');
    const usdcPrice = await getAssetPrice('usdc');
    // eslint-disable-next-line no-restricted-syntax
    for (const wallet of wallets) {
      value += btcPrice.price * wallet.dataValues.btcQuantity
        + ethPrice.price * wallet.dataValues.ethQuantity
        + usdcPrice.price * wallet.dataValues.ethQuantity;
    }
    return { value, currency: 'CLP' };
  },
});

module.exports = GetUserWalletsValue;
