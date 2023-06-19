const express = require("express");
const {
  createDonorAccount,
  loginDonorAccount,
  updateDonorAccount,
} = require("../controllers/donors");

const { verifyToken } = require("../middlewares/verifyToken");
const { passwordHasher } = require("../middlewares/password_hasher");

const router = express.Router();

router.post("/register", passwordHasher, createDonorAccount);
router.post("/login", loginDonorAccount);
router.post("/update", verifyToken, updateDonorAccount);

module.exports = router;
