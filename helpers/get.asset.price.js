const GET = require('./get.request.helper');

const getAssetPrice = async function assetPrice(ticker) {
  const URL = `https://www.buda.com/api/v2/markets/${ticker}-clp/ticker.json`;
  const data = await GET(URL);
  return { price: parseFloat(data.ticker.last_price[0]), currency: data.ticker.last_price[1] };
};

module.exports = getAssetPrice;
