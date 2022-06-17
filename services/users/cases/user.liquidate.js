const NotFoundRequestError = require('../../../errors/NotFoundError');
const MinimumInvestmentError = require('../../../errors/MinimumInvestment');
const NotEnoughBalanceError = require('../../../errors/NotEnoughBalance');
const BadRequest = require('../../../errors/BadRequestError');
const MaxWithdraw = require('../../../constants/maximum.withdraw');
const MinimumWithdrawal = require('../../../constants/minimum.withdrawal');
const getAssetPrice = require('../../../helpers/get.asset.price');
const getAssetSellConfig = require('../../../helpers/sell.asset.helper');
const sellAsset = require('../../../helpers/asset.market.order');
const GetUserWalletValue = require('../../wallet/cases/get.user.wallet.value');

const SIMULATE_TRANSACTION = process.env.BUDA_SIMULATION;

const LiquidateUseCase = (userRepo, walletRepo) => ({
  liquidate: async (id, riskProfile, body) => {
    if (!body.withdraw) {
      throw new BadRequest('El request debe contener withdraw');
    }
    const user = await userRepo.getUser(id);
    if (!user) {
      throw new NotFoundRequestError('Usuario no encontrado');
    }

    const getWalletValue = GetUserWalletValue(walletRepo);
    const initialWalletValue = await getWalletValue.getUserWalletValue(id, riskProfile);

    if (initialWalletValue.value - body.withdraw < 0) {
      throw new NotEnoughBalanceError('El retiro excede lo disponible en el portafolio');
    }

    if (body.withdraw > MaxWithdraw) {
      throw new MinimumInvestmentError(`La inversion debe ser de un minimo de $${MaxWithdraw} para este portafolio`);
    }

    if (body.withdraw < MinimumWithdrawal[riskProfile]) {
      throw new MinimumInvestmentError(`La inversion debe ser de un minimo de $${MinimumWithdrawal[riskProfile]} para este portafolio`);
    }

    const percentageWithdraw = body.withdraw / initialWalletValue.value;

    const userPortfolioWallet = await walletRepo.getUserkWalletByRisk(id, riskProfile);
    const sellConfig = getAssetSellConfig(percentageWithdraw, userPortfolioWallet.dataValues);

    const qBTC = (sellConfig.pBTC) * 0.98;
    const qETH = (sellConfig.pETH) * 0.98;
    const qUSDC = (sellConfig.pUSDC) * 0.98;

    const btcPrice = await getAssetPrice('btc');
    const ethPrice = await getAssetPrice('eth');
    const usdcPrice = await getAssetPrice('usdc');

    let withdrawnAmount;

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

      withdrawnAmount = assetSells.BTC * btcPrice.price
      + assetSells.ETH * ethPrice.price
      + assetSells.USDC * usdcPrice.price;

      const UpdatedWallet = await userPortfolioWallet.set({
        btcQuantity: userPortfolioWallet.dataValues.btcQuantity - assetSells.BTC,
        ethQuantity: userPortfolioWallet.dataValues.ethQuantity - assetSells.ETH,
        usdcQuantity: userPortfolioWallet.dataValues.usdcQuantity - assetSells.USDC,
      });

      const updatedUser = await user.set({
        balance: Math.floor(user.balance + withdrawnAmount * percentageWithdraw),
        netInvestment: Math.floor(user.netInvestment - user.netInvestment * percentageWithdraw),
      });
      updatedUser.save();
      UpdatedWallet.save();

      return {
        withdrawn: Math.floor(withdrawnAmount),
        commission: Math.ceil(body.withdraw - withdrawnAmount),
      };
    }
    // Caso simulado
    const UpdatedWallet = await userPortfolioWallet.set({
      btcQuantity: userPortfolioWallet.dataValues.btcQuantity - qBTC,
      ethQuantity: userPortfolioWallet.dataValues.ethQuantity - qETH,
      usdcQuantity: userPortfolioWallet.dataValues.usdcQuantity - qUSDC,
    });

    withdrawnAmount = qBTC * btcPrice.price + qETH * ethPrice.price + qUSDC * usdcPrice.price;

    const updatedUser = await user.set({
      balance: Math.floor(user.balance + withdrawnAmount * percentageWithdraw),
      netInvestment: Math.floor(user.netInvestment - user.netInvestment * percentageWithdraw),
    });
    updatedUser.save();
    UpdatedWallet.save();

    return {
      withdrawn: Math.floor(withdrawnAmount),
      commission: Math.ceil(body.withdraw - withdrawnAmount),
    };
  },
});

module.exports = LiquidateUseCase;
