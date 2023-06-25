const { DataTypes } = require("sequelize");
const sequelize = require("../db-instance");

const Admin = sequelize.define(
  "Admin",
  {
    admin_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(50),
    },
    phone_number: {
      type: DataTypes.STRING(50),
    },
  },
  {
    tableName: "Admins",
    timestamps: false,
  }
);

module.exports = Admin;
