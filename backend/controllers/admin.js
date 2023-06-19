const Donor = require("../models/donor");
const Collector = require("../models/collector");
const Distributor = require("../models/distributor");

exports.updateAdminAccount = async (req, res) => {
  const { admin_id } = req.params;
  const { updateInfo } = req.body;

  try {
    const admin = await Admin.update(updateInfo, {
      where: {
        admin_id,
      },
    });
    res.status(200).json({ admin });
  } catch (error) {
    res.status(500).json({ error: "Failed to update admin account" });
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
    res.status(201).json({ collector });
  } catch (error) {
    res.status(500).json({ error: "Failed to create collector account" });
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
    res.status(201).json({ distributor });
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
