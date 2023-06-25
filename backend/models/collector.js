const { DataTypes } = require("sequelize");
const sequelize = require("../db-instance");

const Collector = sequelize.define(
  "Collector",
  {
    collector_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(50),
    },
    password: {
      type: DataTypes.STRING(255),
    },
    email: {
      type: DataTypes.STRING(100),
    },
    full_name: {
      type: DataTypes.STRING(100),
    },
    contact_number: {
      type: DataTypes.STRING(20),
    },
    state: {
      type: DataTypes.STRING(50),
    },
    city: {
      type: DataTypes.STRING(50),
    },
    woreda: {
      type: DataTypes.STRING(50),
    },
    kebele: {
      type: DataTypes.STRING(50),
    },
  },
  {
    tableName: "Collectors",
    timestamps: false,
  }
);

module.exports = Collector;
