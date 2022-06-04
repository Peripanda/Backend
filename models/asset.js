const Sequelize = require('sequelize');
const db = require('../core/db/database');

const Asset = db.define(
  'assets',
  {
    ticker: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  },
);

module.exports = Asset;
