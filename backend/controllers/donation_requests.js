const DonationRequest = require("../models/donationRequest");
const Donor = require("../models/donor");
const Collector = require("../models/collector");
const Distributor = require("../models/distributor");
const {
  send_successful_donation_notification,
} = require("../utils/send_succcessful_donation_email");

exports.createDonationRequest = async (req, res) => {
  const { location, prepared_datetime, pickup_time } = req.body;
  const { donor_id } = req.user;

  const donor = await Donor.findOne({ where: { donor_id: donor_id } });

  if (!donor) {
    return res.status(400).json({ error: "Donor account does not exist" });
  }

  const donationRequest = await DonationRequest.create({
    donor_id: donor_id,
    location: location,
    prepared_datetime: prepared_datetime,
    pickup_time: pickup_time,
    state: "New",
  });

  await send_successful_donation_notification(
    donor.username,
    location,
    pickup_time
  );

  return res.status.json({
    message: "Donation request created successfully",
    donationRequest: donationRequest.request_id,
  });
};

exports.getDonationRequest = async (req, res) => {
  const { request_id } = req.params;

  const donationRequest = await DonationRequest.findOne({
    where: { request_id: request_id },
  });

  if (!donationRequest) {
    return res.status(400).json({ error: "Donation request does not exist" });
  }

  return res.status(200).json({ donationRequest: donationRequest });
};

exports.updateDonationRequest = async (req, res) => {
  const { request_id } = req.params;
  const { updates } = req.body;

  const donationRequest = await DonationRequest.findOne({
    where: { request_id: request_id },
  });

  if (!donationRequest) {
    return res.status(400).json({ error: "Donation request does not exist" });
  }

  const updatedDonationRequest = await donationRequest.update(updates);

  return res.status(200).json({
    message: "Donation request updated successfully",
    donationRequest: updatedDonationRequest,
  });
};

exports.cancelDonationRequest = async (req, res) => {
  const { request_id } = req.params;

  const donationRequest = await DonationRequest.findOne({
    where: { request_id: request_id },
  });

  if (!donationRequest) {
    return res.status(400).json({ error: "Donation request does not exist" });
  }

  const deleteDonationRequest = await donationRequest.destroy();

  return res.status(200).json({
    message: "Donation request cancelled successfully",
    donationRequest: deleteDonationRequest,
  });
};

exports.getDonationRequests = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 9;
  const offset = (page - 1) * limit;

  const totalDonationRequests = await DonationRequest.count({});

  const totalPages = Math.ceil(totalDonationRequests / limit);

  const donationRequests = await DonationRequest.findAll({
    offset,
    limit,
  });

  const hasNextPage = page < totalPages;

  res.json({
    donationRequests,
    totalDonationRequests,
    totalPages,
    hasNextPage,
  });
};
