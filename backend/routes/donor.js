const express = require("express");
const {
  createDonorAccount,
  loginDonorAccount,
  updateDonorAccount,
  thisAccount,
} = require("../controllers/donors");

const {
  createDonationRequest,
  getDonationRequestsByDonor,
  updateDonationRequest,
  cancelDonationRequest,
} = require("../controllers/donation_requests");

const { verifyToken } = require("../middlewares/verifyToken");
const { passwordHasher } = require("../middlewares/password_hasher");

const router = express.Router();

router.post("/register", passwordHasher, createDonorAccount);
router.post("/login", loginDonorAccount);
router.put("/update", verifyToken, updateDonorAccount);
router.get("/thisaccount", verifyToken, thisAccount);
router.post("/makedonation", verifyToken, createDonationRequest);
router.get("/mydonations", verifyToken, getDonationRequestsByDonor);
router.put("/updatedonation/:request_id", updateDonationRequest);
router.delete(
  "/canceldonation/:request_id",
  verifyToken,
  cancelDonationRequest
);

module.exports = router;
