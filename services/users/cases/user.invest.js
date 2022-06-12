const NotFoundRequestError = require('../../../errors/NotFoundError');
const MinimumInvestmentError = require('../../../errors/MinimumInvestment');
const NotEnoughBalanceError = require('../../../errors/NotEnoughBalance');
const BadRequest = require('../../../errors/BadRequestError');
const MinimumInvestment = require('../../../constants/minimum.investment');
const getAssetPurchaseConfig = require('../../../helpers/purchase.asset.helper');
const getAssetPrice = require('../../../helpers/get.asset.price');
const buyAsset = require('../../../helpers/asset.market.order');

const SIMULATE_TRANSACTION = process.env.BUDA_SIMULATION;

const InvestUseCase = (userRepo, walletRepo, portfolioRepo) => ({
  invest: async (id, riskProfile, body) => {
    if (!body.investment) {
      throw new BadRequest('El request debe contener investment');
    }
    const user = await userRepo.getUser(id);
    if (!user) {
      throw new NotFoundRequestError('Usuario no encontrado');
    }
    if (user.balance - body.investment < 0) {
      throw new NotEnoughBalanceError('La inversion excede el balance disponible del usuario');
    }
    if (body.investment < MinimumInvestment[riskProfile]) {
      throw new MinimumInvestmentError(`La inversion debe ser de un minimo de $${MinimumInvestment[riskProfile]} para este portafolio`);
    }
    const portfolioConfig = await portfolioRepo.getUserPortfolioByRisk(riskProfile);
    const userPortfolioWallet = await walletRepo.getUserkWalletByRisk(id, riskProfile);
    // eslint-disable-next-line no-unused-vars
    const purchaseConfig = getAssetPurchaseConfig(body.investment, portfolioConfig.dataValues);
    const updatedUser = await user.set({
      balance: user.balance - body.investment,
      netInvestment: user.netInvestment + body.investment,
    });
    updatedUser.save();

    const btcPrice = await getAssetPrice('btc');
    const ethPrice = await getAssetPrice('eth');
    const usdcPrice = await getAssetPrice('usdc');

    /* volumes to purchase. Should trigger a purchase if !0 */

    const qBTC = (purchaseConfig.pBTC / btcPrice.price) * 0.98;
    const qETH = (purchaseConfig.pETH / ethPrice.price) * 0.98;
    const qUSDC = (purchaseConfig.pUSDC / usdcPrice.price) * 0.98;

    if (SIMULATE_TRANSACTION === 'FALSE') {
      const assetPurchases = {
        BTC: 0,
        ETH: 0,
        USDC: 0,
      };

      // Compra BTC
      const purchaseBTC = await buyAsset(qBTC, 'btc', 'Bid');
      assetPurchases.BTC += parseFloat(purchaseBTC.order.amount[0]);

      // Compra ETH
      const purchaseETH = await buyAsset(qETH, 'eth', 'Bid');
      assetPurchases.ETH = parseFloat(purchaseETH.order.amount[0]);

      // Compra USDC
      if (qUSDC !== 0) {
        const purchaseUSDC = await buyAsset(qUSDC, 'usdc', 'Bid');
        assetPurchases.USDC = parseFloat(purchaseUSDC.order.amount[0]);
      }
      const UpdatedWallet = await userPortfolioWallet.set({
        btcQuantity: userPortfolioWallet.dataValues.btcQuantity + assetPurchases.BTC,
        ethQuantity: userPortfolioWallet.dataValues.ethQuantity + assetPurchases.ETH,
        usdcQuantity: userPortfolioWallet.dataValues.usdcQuantity + assetPurchases.USDC,
      });
      return UpdatedWallet.save();
    }
    // Caso simulado
    const UpdatedWallet = await userPortfolioWallet.set({
      btcQuantity: userPortfolioWallet.dataValues.btcQuantity + qBTC,
      ethQuantity: userPortfolioWallet.dataValues.ethQuantity + qETH,
      usdcQuantity: userPortfolioWallet.dataValues.usdcQuantity + qUSDC,
    });
    return UpdatedWallet.save();
  },
});

module.exports = InvestUseCase;
