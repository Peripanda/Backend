const Sequelize = require('sequelize');
const db = require('../core/db/database');

const Portfolio = db.define(
  'portfolios',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    risk: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    btcWeight: {
      type: Sequelize.FLOAT,
      allowNull: true,
      field: 'btc_weight',
    },
    ethWeight: {
      type: Sequelize.FLOAT,
      allowNull: true,
      field: 'eth_weight',
    },
    usdcWeight: {
      type: Sequelize.FLOAT,
      allowNull: true,
      field: 'usdc_weight',
    },
  },
  {
    timestamps: false,
  },
);

module.exports = Portfolio;
