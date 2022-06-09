const NotFoundRequestError = require('../../../errors/NotFoundError');
const MinimumInvestmentError = require('../../../errors/MinimumInvestment');
const NotEnoughBalanceError = require('../../../errors/NotEnoughBalance');
const BadRequest = require('../../../errors/BadRequestError');
const MinimumInvestment = require('../../../constants/minimum.investment');
const getAssetPurchaseConfig = require('../../../helpers/purchase.asset.helper');
const getAssetPrice = require('../../../helpers/get.asset.price');

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

    const qBTC = purchaseConfig.pBTC / btcPrice.price;
    const qETH = purchaseConfig.pETH / ethPrice.price;
    const qUSDC = purchaseConfig.pUSDC / usdcPrice.price;

    // TODO: Gatilla la compra en Buda en base a purchase config: Compra de tipo Limit
    // La purchaseConfig.pBTC es la cantidad en pesos a comprar de BTC
    // La purchaseConfig.pETH es la cantidad en pesos a comprar de ETH
    // La purchaseConfig.pUSDC es la cantidad en pesos a comprar de USDC
    // La llamada de buda require volumen del bid, por lo que las compras debiesen ser en volumen
    console.log(btcPrice.price)
    console.log( purchaseConfig.pBTC)

    // reemplazar con las cantidades de cada asset comprado
    const UpdatedWallet = await userPortfolioWallet.set({
      btcQuantity: userPortfolioWallet.dataValues.btcQuantity + qBTC,
      ethQuantity: userPortfolioWallet.dataValues.ethQuantity + qETH,
      usdcQuantity: userPortfolioWallet.dataValues.usdcQuantity + qUSDC,
    });
    return UpdatedWallet.save();
  },
});

module.exports = InvestUseCase;
