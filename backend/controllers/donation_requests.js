const DonationRequest = require("../models/donationRequest");
const Donor = require("../models/donor");
const Collector = require("../models/collector");
const Distributor = require("../models/distributor");
const {
  send_successful_donation_notification,
  alertDistributor,
} = require("../utils/notification_emails");

exports.createDonationRequest = async (req, res) => {
  try {
    const { location, prepared_datetime, pickup_time, contact_number } =
      req.body;
    const { donor_id } = req.user;

    const donor = await Donor.findOne({ where: { donor_id: donor_id } });

    if (!donor) {
      return res.status(400).json({ error: "Donor account does not exist" });
    }

    const currentDate = new Date();
    const [hours, minutes] = prepared_datetime.split(":");
    currentDate.setUTCHours(hours);
    currentDate.setUTCMinutes(minutes);
    currentDate.setUTCSeconds(0);
    currentDate.setUTCMilliseconds(0);

    const donationRequest = await DonationRequest.create({
      donor_id: donor_id,
      location: location,
      prepared_datetime: currentDate,
      pickup_time: pickup_time,
      contact_number: contact_number,
      state: "New",
    });

    // await send_successful_donation_notification(
    //   donor.username,
    //   location,
    //   pickup_time
    // );

    return res.status(201).json({
      message: "Donation request created successfully",
      donationRequest: donationRequest.request_id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create donation request" });
  }
};

exports.getDonationRequest = async (req, res) => {
  try {
    const { request_id } = req.params;

    const donationRequest = await DonationRequest.findOne({
      where: { request_id: request_id },
    });

    if (!donationRequest) {
      return res.status(400).json({ error: "Donation request does not exist" });
    }

    return res.status(200).json({ donationRequest: donationRequest });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to get donation request" });
  }
};

exports.updateDonationRequest = async (req, res) => {
  try {
    console.log(req.body);
    const { request_id } = req.params;
    const { contact_number, pickup_time, location } = req.body;

    const donationRequest = await DonationRequest.findOne({
      where: { request_id: request_id },
    });

    if (!donationRequest) {
      return res.status(400).json({ error: "Donation request does not exist" });
    }

    const updatedDonationRequest = await donationRequest.update({
      contact_number,
      pickup_time,
      location,
    });

    return res.status(200).json({
      message: "Donation request updated successfully",
      donationRequest: updatedDonationRequest,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update donation request" });
  }
};

exports.cancelDonationRequest = async (req, res) => {
  try {
    const { request_id } = req.params;

    const donationRequest = await DonationRequest.findOne({
      where: { request_id: request_id },
    });

    if (!donationRequest) {
      return res.status(400).json({ error: "Donation request does not exist" });
    }

    if (donationRequest.state !== "New") {
      return res.status(400).json({
        error: "Donation request cannot be cancelled at this state",
      });
    }

    const deleteDonationRequest = await donationRequest.destroy();

    return res.status(200).json({
      message: "Donation request cancelled successfully",
      donationRequest: deleteDonationRequest,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to cancel donation request" });
  }
};

exports.getDonationRequests = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 9;
    const offset = (page - 1) * limit;
    const state = req.query.state;

    let whereCondition = {};
    if (state) {
      whereCondition.state = state;
    }

    const donationRequests = await DonationRequest.findAndCountAll({
      where: whereCondition,
      limit,
      offset,
    });

    donationRequests.rows.reverse();
    const totalPages = Math.ceil(donationRequests.count / limit);
    const hasNextPage = page < totalPages;

    return res.status(200).json({
      donationRequests: donationRequests.rows,
      totalDonationRequests: donationRequests.count,
      currentPage: page,
      hasNextPage: hasNextPage,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to get donation requests" });
  }
};

exports.getDonationRequestsByDonor = async (req, res) => {
  try {
    const donor_id = req.user.donor_id;
    const page = parseInt(req.query.page) || 1;
    const limit = 4;
    const offset = (page - 1) * limit;

    const totalDonationRequests = await DonationRequest.count({
      where: { donor_id: donor_id },
    });
    const totalPages = Math.ceil(totalDonationRequests / limit);

    const donationRequests = await DonationRequest.findAll({
      where: { donor_id: donor_id },
      offset,
      limit,
    });

    // Reverse the order of donationRequests array
    donationRequests.reverse();

    const hasNextPage = page < totalPages;

    res.json({
      donationRequests,
      totalDonationRequests,
      totalPages,
      hasNextPage,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to get donation requests by donor" });
  }
};

exports.assignCollector = async (req, res) => {
  try {
    const { request_id, collector_id } = req.query;

    const donationRequest = await DonationRequest.findOne({
      where: { request_id: request_id },
    });

    if (!donationRequest) {
      return res.status(400).json({ error: "Donation request does not exist" });
    }

    const collector = await Collector.findOne({
      where: { collector_id: collector_id },
    });

    if (!collector) {
      return res
        .status(400)
        .json({ error: "Collector account does not exist" });
    }

    const updatedDonationRequest = await donationRequest.update({
      collector_id: collector_id,
      state: "Pending",
    });

    return res.status(200).json({
      message: "Collector assigned successfully",
      donationRequest: updatedDonationRequest,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to assign collector" });
  }
};

exports.assignDistributor = async (req, res) => {
  try {
    const { request_id, distributor_id } = req.query;

    const donationRequest = await DonationRequest.findOne({
      where: { request_id: request_id },
    });

    if (!donationRequest) {
      return res.status(400).json({ error: "Donation request does not exist" });
    }

    const donor = await Donor.findOne({
      where: { donor_id: donationRequest.donor_id },
    });

    const distributor = await Distributor.findOne({
      where: { distributor_id: distributor_id },
    });

    if (!distributor) {
      return res
        .status(400)
        .json({ error: "Distributor account does not exist" });
    }

    // await alertDistributor(
    //   distributor.email,
    //   donationRequest.request_id,
    //   donationRequest.location,
    //   donationRequest.pickup_time,
    //   donor.contact_number
    // );

    const updatedDonationRequest = await donationRequest.update({
      distributor_id: distributor_id,
    });

    return res.status(200).json({
      message: "Distributor assigned successfully",
      donationRequest: updatedDonationRequest,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to assign distributor" });
  }
};

exports.markAsDone = async (req, res) => {
  try {
    const { request_id } = req.query;

    const donationRequest = await DonationRequest.findOne({
      where: { request_id: request_id },
    });

    if (!donationRequest) {
      return res.status(400).json({ error: "Donation request does not exist" });
    }

    const updatedDonationRequest = await donationRequest.update({
      state: "Done",
    });

    return res.status(200).json({
      message: "Donation request marked as done successfully",
      donationRequest: updatedDonationRequest,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to mark donation request as done" });
  }
};
