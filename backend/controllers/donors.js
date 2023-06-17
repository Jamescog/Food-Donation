const Donor = require("../models/donor");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createDonorAccount = async (req, res) => {
  const { username, password, email } = req.body;
  if (await Donor.findOne({ where: { username: username } })) {
    return res.status(400).json({ error: "Username already exists" });
  }

  if (await Donor.findOne({ where: { email: email } })) {
    return res.status(400).json({ error: "Email already exists" });
  }

  const donor = await Donor.create({
    username: username,
    password: password,
    email: email,
  });

  return res
    .status(200)
    .json({ message: "Donor account created successfully" });
};

exports.loginDonorAccount = async (req, res) => {
  const { email, password } = req.body;
  const account = Donor.findOne({ where: { email: email } });

  if (!account) {
    return res.status(400).json({ error: "Account does not exist" });
  }

  const validPassword = await bcrypt.compare(password, account.password);
  if (!validPassword) {
    return res.status(400).json({ error: "Invalid password" });
  }

  const token = jwt.sign({ email: email }, process.env.JWT_SECRET);

  return res.status(200).json({ token: token });
};

exports.updateDonorAccount = async (req, res) => {
  const { updates } = req.body;
  const { donor_id } = req.user;

  const donor = await Donor.findOne({ where: { donor_id: donor_id } });
  if (!donor) {
    return res.status(400).json({ error: "Donor account does not exist" });
  }

  const updatedDonor = await donor.update(updates);
  return res
    .status(200)
    .json({ message: "Donor account updated successfully" });
};
