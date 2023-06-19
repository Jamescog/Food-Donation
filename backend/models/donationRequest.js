const { DataTypes } = require("sequelize");
const sequelize = require("../db-instance");

const DonationRequest = sequelize.define(
  "DonationRequest",
  {
    request_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    donor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    collector_id: {
      type: DataTypes.INTEGER,
    },
    distributor_id: {
      type: DataTypes.INTEGER,
    },
    contact_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    prepared_datetime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    pickup_time: {
      type: DataTypes.ENUM("Morning", "Afternoon", "Night"),
      allowNull: false,
    },
    state: {
      type: DataTypes.ENUM("New", "Pending", "Done"),
      allowNull: false,
    },
  },
  {
    tableName: "Donation_Requests",
    timestamps: false,
  }
);

module.exports = DonationRequest;
