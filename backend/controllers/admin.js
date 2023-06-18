const Donor = require("../models/donor");
const Colloctor = require("../models/collector");
const Distributor = require("../models/distributor");

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

  const collector = await Colloctor.create({
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
};

exports.BlockDonorAccount = async (req, res) => {
  const { donor_id } = req.params;
  const donor = await Donor.update(
    { status: "Blocked" },
    {
      where: {
        donor_id,
      },
    }
  );
  res.status(200).json({ donor });
};

exports.destroyCollectorAccount = async (req, res) => {
  const { collector_id } = req.params;
  const collector = await Colloctor.destroy({
    where: {
      collector_id,
    },
  });
  res.status(200).json({ collector });
};

exports.destroyDistributorAccount = async (req, res) => {
  const { distributor_id } = req.params;
  const distributor = await Distributor.destroy({
    where: {
      distributor_id,
    },
  });
  res.status(200).json({ distributor });
};

exports.unblockDonorAccount = async (req, res) => {
  const { donor_id } = req.params;
  const donor = await Donor.update(
    { status: "Active" },
    {
      where: {
        donor_id,
      },
    }
  );
  res.status(200).json({ donor });
};
