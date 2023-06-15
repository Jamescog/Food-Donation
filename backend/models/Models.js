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
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    contact_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },
  {
    tableName: "Donors",
    timestamps: false,
  }
);

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
    tableName: "Collectors",
    timestamps: false,
  }
);

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
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    tableName: "Admins",
    timestamps: false,
  }
);

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

DonationRequest.belongsTo(Donor, { foreignKey: "donor_id" });
DonationRequest.belongsTo(Collector, { foreignKey: "collector_id" });
DonationRequest.belongsTo(Distributor, { foreignKey: "distributor_id" });

module.exports = {
  Donor,
  Collector,
  Distributor,
  Admin,
  DonationRequest,
};
