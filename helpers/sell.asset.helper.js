const assetPurchaseConfig = function assetConfigCalc(percentageWithdraw, walletConfig) {
  const sellConfig = {
    pBTC: percentageWithdraw * walletConfig.btcQuantity,
    pETH: percentageWithdraw * walletConfig.ethQuantity,
    pUSDC: percentageWithdraw * walletConfig.usdcQuantity,
  };
  return sellConfig;
};

module.exports = assetPurchaseConfig;
