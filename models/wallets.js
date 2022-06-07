const Sequelize = require('sequelize');
const db = require('../core/db/database');
const User = require('./users');

const Wallet = db.define(
  'wallets',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: 'user_id',
    },
    walletType: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'wallet_type',
    },
    btcQuantity: {
      type: Sequelize.FLOAT,
      allowNull: true,
      default: 0,
      field: 'btc_quantity',
    },
    ethQuantity: {
      type: Sequelize.FLOAT,
      allowNull: true,
      default: 0,
      field: 'eth_quantity',
    },
    usdcQuantity: {
      type: Sequelize.FLOAT,
      allowNull: true,
      default: 0,
      field: 'usdc_quantity',
    },
  },
  {
    timestamps: false,
  },
);

Wallet.belongsTo(User, {
  as: 'User',
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

User.hasMany(Wallet, {
  as: 'Wallet',
});

module.exports = Wallet;
