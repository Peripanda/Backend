const getAssetPrice = require('../../../helpers/get.asset.price');

const GetUserWalletValue = (walletRepo) => ({

  getUserWalletValue: async (userId, riskProfile) => {
    const wallet = await walletRepo.getUserkWalletByRisk(userId, riskProfile);
    const btcPrice = await getAssetPrice('btc');
    const ethPrice = await getAssetPrice('eth');
    const usdcPrice = await getAssetPrice('usdc');
    const value = btcPrice.price * wallet.dataValues.btcQuantity
        + +ethPrice.price * wallet.dataValues.ethQuantity
        + +usdcPrice.price * wallet.dataValues.usdcQuantity;
    return { value: Math.floor(value), currency: 'CLP' };
  },
});

module.exports = GetUserWalletValue;
