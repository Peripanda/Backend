const GET = require('../../../helpers/get.request.helper');
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
    const URL = `https://www.buda.com/api/v2/markets/${ticker}-clp/ticker.json`;
    const data = await GET(URL);
    return { price: parseFloat(data.ticker.last_price[0]), currency: data.ticker.last_price[1] };
  },
});

module.exports = AssetUseCase;
