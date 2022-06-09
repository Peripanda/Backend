const getAssetPrice = require('../../../helpers/get.asset.price');
const NotFoundRequestError = require('../../../errors/NotFoundError');

const AssetUseCase = (assetRepo) => ({

  getAssetPrice: async (ticker) => {
    // get all tickers
    const assets = await assetRepo.listAssets();
    const tickers = [];
    assets.forEach((x) => tickers.push(x.ticker));
    if (!(tickers.includes(ticker))) {
      throw new NotFoundRequestError('Asset no encontrado.');
    }
    const price = await getAssetPrice(ticker);
    return price;
  },
});

module.exports = AssetUseCase;
