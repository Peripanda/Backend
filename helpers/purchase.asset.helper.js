const assetPurchaseConfig = function assetConfigCalc(investment, portfolioConfig) {
  const purchaseConfig = {
    pBTC: Math.round(investment * portfolioConfig.btcWeight),
    pETH: Math.round(investment * portfolioConfig.ethWeight),
    pUSDC: Math.round(investment * portfolioConfig.usdcWeight),
  };
  purchaseConfig.pBTC += investment - (
    purchaseConfig.pBTC
    + purchaseConfig.pETH
    + purchaseConfig.pUSDC
  );
  return purchaseConfig;
};

module.exports = assetPurchaseConfig;
