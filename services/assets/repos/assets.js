const assetRepo = (AssetModel) => ({

  listAssets: () => AssetModel.findAll({
    attributes: ['ticker'],
  }),
});

module.exports = assetRepo;
