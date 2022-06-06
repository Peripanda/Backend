const router = require('express-promise-router')();

// Cases
const GetAssetPrice = require('../cases/get.assets.price');

// Repos
const AssetsRepo = require('../repos/assets');

// Models
const AssetModel = require('../../../models/assets');

/* GET users listing. */
router.get('/:ticker', async (req, res) => {
  const getAssetPrice = GetAssetPrice(AssetsRepo(AssetModel));
  const price = await getAssetPrice.getAssetPrice(req.params.ticker);
  res.send(price);
});

module.exports = router;
