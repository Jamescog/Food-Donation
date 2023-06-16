const Donor = require("./donor");
const Collector = require("./collector");
const Distributor = require("./distributor");
const DonationRequest = require("./donationRequest");

DonationRequest.belongsTo(Donor, { foreignKey: "donor_id" });
DonationRequest.belongsTo(Collector, { foreignKey: "collector_id" });
DonationRequest.belongsTo(Distributor, { foreignKey: "distributor_id" });

module.exports = {
  Donor,
  Collector,
  Distributor,
};
