const Sequelize = require('sequelize');
const db = require('../core/db/database');

const User = db.define(
  'users',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    balance: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    birthDate: {
      type: Sequelize.DATE,
      allowNull: true,
      field: 'birth_date',
<<<<<<< HEAD
    },
    netInvestment: {
      type: Sequelize.INTEGER,
      allowNull: true,
      field: 'net_investment',
      default: 0,
=======
>>>>>>> de8c6b2 (Dev (#5))
    },
  },
  {
    timestamps: false,
  },
);

module.exports = User;
