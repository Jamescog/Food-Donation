const Donor = require("../models/donor");
const Collector = require("../models/collector");
const Distributor = require("../models/distributor");
const Admin = require("../models/admin");
const DonationRequest = require("../models/donationRequest");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createAdminAccount = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const admin = await Admin.create({
      username,
      password,
      email,
    });
    res.status(201).json({ admin });
  } catch (error) {
    res.status(500).json({
      error: "Failed to create admin account",
      message: error.message,
    });
  }
};

exports.loginAdminAccount = async (req, res) => {
  try {
    const { email, password } = req.body;
    const account = await Admin.findOne({ where: { email: email } });

    if (!account) {
      return res.status(400).json({ error: "Account does not exist" });
    }

    const validPassword = await bcrypt.compare(password, account.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ email: email }, process.env.JWT_SECRET);
    return res.status(200).json({ token: token, isAdmin: true });
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Internal Server Error: ${error.message}` });
  }
};

exports.thisAccount = async (req, res) => {
  try {
    const { password, ...userWithoutPassword } = req.user;
    res.status(200).json({ user: userWithoutPassword });
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Internal Server Error: ${error.message}` });
  }
};

exports.updateAdminAccount = async (req, res) => {
  const { admin_id } = req.user;
  const { contact_number } = req.body;

  try {
    const admin = await Admin.update(
      { contact_number },
      {
        where: {
          admin_id,
        },
      }
    );
    res.status(200).json({ admin });
  } catch (error) {
    res.status(500).json({ error: "Failed to update admin account" });
  }
};

exports.statGenerator = async (req, res) => {
  try {
    const donors = await Donor.findAll();
    const collectors = await Collector.findAll();
    const distributors = await Distributor.findAll();
    const requests = await DonationRequest.findAll();

    const stats = {
      donors: donors.length,
      collectors: collectors.length,
      distributors: distributors.length,
      requests: requests.length,
    };

    res.status(200).json({ stats });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate stats" });
  }
};

exports.createCollectorAccount = async (req, res) => {
  const {
    username,
    password,
    email,
    full_name,
    contact_number,
    state,
    city,
    woreda,
    kebele,
  } = req.body;

  try {
    const collector = await Collector.create({
      username,
      password,
      email,
      full_name,
      contact_number,
      state,
      city,
      woreda,
      kebele,
    });
    res.status(200).json({ collector });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: `Failed to create collector account ${error.message}`,
      message: error.message,
    });
  }
};

exports.createDistributorAccount = async (req, res) => {
  const {
    username,
    password,
    email,
    full_name,
    contact_number,
    state,
    city,
    woreda,
    kebele,
  } = req.body;

  try {
    const distributor = await Distributor.create({
      username,
      password,
      email,
      full_name,
      contact_number,
      state,
      city,
      woreda,
      kebele,
    });
    res.status(200).json({ distributor });
  } catch (error) {
    res.status(500).json({ error: "Failed to create distributor account" });
  }
};

exports.blockDonorAccount = async (req, res) => {
  const { donor_id } = req.params;

  try {
    const donor = await Donor.update(
      { status: "Blocked" },
      {
        where: {
          donor_id,
        },
      }
    );
    res.status(200).json({ donor });
  } catch (error) {
    res.status(500).json({ error: "Failed to block donor account" });
  }
};

exports.destroyCollectorAccount = async (req, res) => {
  const { collector_id } = req.params;

  try {
    const collector = await Collector.destroy({
      where: {
        collector_id,
      },
    });
    res.status(200).json({ collector });
  } catch (error) {
    res.status(500).json({ error: "Failed to destroy collector account" });
  }
};

exports.destroyDistributorAccount = async (req, res) => {
  const { distributor_id } = req.params;

  try {
    const distributor = await Distributor.destroy({
      where: {
        distributor_id,
      },
    });
    res.status(200).json({ distributor });
  } catch (error) {
    res.status(500).json({ error: "Failed to destroy distributor account" });
  }
};

exports.unblockDonorAccount = async (req, res) => {
  const { donor_id } = req.params;

  try {
    const donor = await Donor.update(
      { status: "Active" },
      {
        where: {
          donor_id,
        },
      }
    );
    res.status(200).json({ donor });
  } catch (error) {
    res.status(500).json({ error: "Failed to unblock donor account" });
  }
};

exports.updateCollectorAccount = async (req, res) => {
  const { collector_id } = req.params;
  const { updateInfo } = req.body;

  try {
    const collector = await Collector.update(updateInfo, {
      where: {
        collector_id,
      },
    });
    res.status(200).json({ collector });
  } catch (error) {
    res.status(500).json({ error: "Failed to update collector account" });
  }
};

exports.updateDistributorAccount = async (req, res) => {
  const { distributor_id } = req.params;
  const { updateInfo } = req.body;

  try {
    const distributor = await Distributor.update(updateInfo, {
      where: {
        distributor_id,
      },
    });
    res.status(200).json({ distributor });
  } catch (error) {
    res.status(500).json({ error: "Failed to update distributor account" });
  }
};

exports.getAllCollectors = async (req, res) => {
  try {
    const collectors = await Collector.findAll();
    res.status(200).json({ collectors });
  } catch (error) {
    res.status(500).json({ error: "Failed to get all collectors" });
  }
};

exports.getAllDistributors = async (req, res) => {
  try {
    const distributors = await Distributor.findAll();
    res.status(200).json({ distributors });
  } catch (error) {
    res.status(500).json({ error: "Failed to get all distributors" });
  }
};

exports.getAllDonors = async (req, res) => {
  try {
    const donors = await Donor.findAll();
    res.status(200).json({ donors });
  } catch (error) {
    res.status(500).json({ error: "Failed to get all donors" });
  }
};
