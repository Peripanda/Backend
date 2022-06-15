const NotFoundRequestError = require('../../../errors/NotFoundError');
const MinimumInvestmentError = require('../../../errors/MinimumInvestment');
const NotEnoughBalanceError = require('../../../errors/NotEnoughBalance');
const BadRequest = require('../../../errors/BadRequestError');
const MaxWithdraw = require('../../../constants/maximum.withdraw');
const getAssetSellConfig = require('../../../helpers/sell.asset.helper');
const sellAsset = require('../../../helpers/asset.market.order');
const GetUserWalletValue = require('../../wallet/cases/get.user.wallet.value');

const SIMULATE_TRANSACTION = process.env.BUDA_SIMULATION;

const LiquidateUseCase = (userRepo, walletRepo, portfolioRepo) => ({
  liquidate: async (id, riskProfile, body) => {
    if (!body.withdraw) {
      throw new BadRequest('El request debe contener withdraw');
    }
    const user = await userRepo.getUser(id);
    if (!user) {
      throw new NotFoundRequestError('Usuario no encontrado');
    }

    const getWalletValue = GetUserWalletValue(walletRepo);
    const walletValue = await getWalletValue.getUserWalletValue(id, riskProfile);

    if (walletValue.value - body.withdraw < 0) {
      throw new NotEnoughBalanceError('El retiro excede lo disponible en el portafolio');
    }

    if (body.withdraw < MaxWithdraw) {
      throw new MinimumInvestmentError(`La inversion debe ser de un minimo de $${MaxWithdraw} para este portafolio`);
    }

    const percentageWithdraw = walletValue.value / body.withdraw;

    const portfolioConfig = await portfolioRepo.getUserPortfolioByRisk(riskProfile);
    const sellConfig = getAssetSellConfig(body.investment, portfolioConfig.dataValues);
    const userPortfolioWallet = await walletRepo.getUserkWalletByRisk(id, riskProfile);

    // eslint-disable-next-line no-unused-vars
    const updatedUser = await user.set({
      balance: user.balance - user.balance * percentageWithdraw,
      netInvestment: user.netInvestment - user.netInvestment * percentageWithdraw,
    });
    updatedUser.save();

    /* volumes to purchase. Should trigger a purchase if !0 */

    const qBTC = (sellConfig.pBTC) * 0.98;
    const qETH = (sellConfig.pETH) * 0.98;
    const qUSDC = (sellConfig.pUSDC) * 0.98;

    if (SIMULATE_TRANSACTION === 'FALSE') {
      const assetSells = {
        BTC: 0,
        ETH: 0,
        USDC: 0,
      };

      // Venta BTC
      const sellBTC = await sellAsset(qBTC, 'btc', 'Ask');
      assetSells.BTC += parseFloat(sellBTC.order.amount[0]);

      // Venta ETH
      const sellETH = await sellAsset(qETH, 'eth', 'Ask');
      assetSells.ETH = parseFloat(sellETH.order.amount[0]);

      // Venta USDC
      if (qUSDC !== 0) {
        const sellUSDC = await sellAsset(qUSDC, 'usdc', 'Ask');
        assetSells.USDC = parseFloat(sellUSDC.order.amount[0]);
      }
      const UpdatedWallet = await userPortfolioWallet.set({
        btcQuantity: userPortfolioWallet.dataValues.btcQuantity - assetSells.BTC,
        ethQuantity: userPortfolioWallet.dataValues.ethQuantity - assetSells.ETH,
        usdcQuantity: userPortfolioWallet.dataValues.usdcQuantity - assetSells.USDC,
      });
      return UpdatedWallet.save();
    }
    // Caso simulado
    const UpdatedWallet = await userPortfolioWallet.set({
      btcQuantity: userPortfolioWallet.dataValues.btcQuantity - qBTC,
      ethQuantity: userPortfolioWallet.dataValues.ethQuantity - qETH,
      usdcQuantity: userPortfolioWallet.dataValues.usdcQuantity - qUSDC,
    });
    return UpdatedWallet.save();
  },
});

module.exports = LiquidateUseCase;
