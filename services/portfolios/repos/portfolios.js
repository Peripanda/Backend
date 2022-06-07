const portfolioRepo = (PortfolioModel) => ({
  getUserPortfolioByRisk: (riskProfile) => PortfolioModel.findOne({
    where: {
      risk: riskProfile,
    },
  }),
});

module.exports = portfolioRepo;
