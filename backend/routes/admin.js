const express = require("express");
const {
  createAdminAccount,
  createCollectorAccount,
  createDistributorAccount,
  blockDonorAccount,
  destroyCollectorAccount,
  destroyDistributorAccount,
  unblockDonorAccount,
  updateCollectorAccount,
  updateDistributorAccount,
  updateAdminAccount,
  getAllCollectors,
  getAllDistributors,
  getAllDonors,
  statGenerator,
  thisAccount,
  loginAdminAccount,
} = require("../controllers/admin");

const {
  getDonationRequests,
  assignCollector,
  assignDistributor,
  markAsDone,
} = require("../controllers/donation_requests");

const { verifyToken } = require("../middlewares/verifyToken");
const { passwordHasher } = require("../middlewares/password_hasher");

const router = express.Router();

router.post(
  "/createCollector",
  // verifyToken,
  passwordHasher,
  createCollectorAccount
);

router.post(
  "/createDistributor",
  verifyToken,
  passwordHasher,
  createDistributorAccount
);
router.post("/createAdmin", passwordHasher, createAdminAccount);
router.post("/updateAdmin", verifyToken, updateAdminAccount);
router.post("/blockDonor:id", verifyToken, blockDonorAccount);
router.post("/fireCollector:id", verifyToken, destroyCollectorAccount);
router.post("/fireDistributor:id", verifyToken, destroyDistributorAccount);
router.post("/ublockDonor:id", verifyToken, unblockDonorAccount);
router.post("/updateCollector:id", verifyToken, updateCollectorAccount);
router.post("/updateDistributor:id", verifyToken, updateDistributorAccount);
router.get("/getAllCollectors", verifyToken, getAllCollectors);
router.get("/getAllDistributors", verifyToken, getAllDistributors);
router.get("/getAllDonors", verifyToken, getAllDonors);
router.get("/donationRequests", verifyToken, getDonationRequests);
router.get("/stat", verifyToken, statGenerator);
router.get("/thisaccount", verifyToken, thisAccount);
router.post("/assignCollector", verifyToken, assignCollector);
router.post("/assignDistributor", verifyToken, assignDistributor);
router.post("/markRequestAsDone", verifyToken, markAsDone);
router.post("/login", loginAdminAccount);

module.exports = router;
