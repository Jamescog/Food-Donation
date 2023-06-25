const Donor = require("../models/donor");
const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createDonorAccount = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

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
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Internal Server Error: ${error.message}` });
  }
};

exports.loginDonorAccount = async (req, res) => {
  try {
    const { email, password } = req.body;
    let account = await Donor.findOne({ where: { email: email } });

    if (!account) {
      account = await Admin.findOne({ where: { email: email } });
      if (!account) {
        return res.status(400).json({ error: "Account does not exist" });
      }
    }

    const validPassword = await bcrypt.compare(password, account.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ email: email }, process.env.JWT_SECRET);
    if (email.startsWith("admin")) {
      return res.status(200).json({ token: token, isAdmin: true });
    }
    return res.status(200).json({ token: token });
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Internal Server Error: ${error.message}` });
  }
};

exports.updateDonorAccount = async (req, res) => {
  try {
    const { donor_id } = req.user;

    const donor = await Donor.findOne({ where: { donor_id: donor_id } });
    if (!donor) {
      return res.status(400).json({ error: "Donor account does not exist" });
    }

    const updatedDonor = await donor.update(req.body);
    return res
      .status(200)
      .json({ message: "Donor account updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

exports.thisAccount = async (req, res) => {
  res.status(200).json({ user: req.user });
};
