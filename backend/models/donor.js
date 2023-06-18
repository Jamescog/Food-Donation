const { DataTypes } = require("sequelize");
const sequelize = require("../db-instance");

const Donor = sequelize.define(
  "Donor",
  {
    donor_id: {
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
    category: {
      type: DataTypes.ENUM("Individual", "Business"),
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    contact_number: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("Active", "Blocked"),
      allowNull: false,
      defaultValue: "Active",
    },
  },
  {
    tableName: "Donors",
    timestamps: false,
  }
);

module.exports = Donor;
