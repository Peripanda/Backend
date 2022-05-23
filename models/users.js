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
      field: 'birth_date'
    },
  },
  {
    timestamps: false,
  },
);

module.exports = User;
