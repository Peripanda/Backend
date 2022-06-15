const assetPurchaseConfig = function assetConfigCalc(percentageWithdraw, portfolioConfig) {
  const sellConfig = {
    pBTC: Math.round(percentageWithdraw * portfolioConfig.btcWeight),
    pETH: Math.round(percentageWithdraw * portfolioConfig.ethWeight),
    pUSDC: Math.round(percentageWithdraw * portfolioConfig.usdcWeight),
  };
  sellConfig.pBTC += percentageWithdraw - (
    sellConfig.pBTC
      + sellConfig.pETH
      + sellConfig.pUSDC
  );
  return sellConfig;
};

module.exports = assetPurchaseConfig;
