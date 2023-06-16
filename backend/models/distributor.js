const { DataTypes } = require("sequelize");
const sequelize = require("../db-instance");

const Distributor = sequelize.define(
  "Distributor",
  {
    distributor_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    full_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    contact_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    woreda: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    tableName: "Distributors",
    timestamps: false,
  }
);

module.exports = Distributor;