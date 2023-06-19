const express = require("express");
const {
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
} = require("../controllers/admin");

const { verifyToken } = require("../middlewares/verifyToken");
const { passwordHasher } = require("../middlewares/password_hasher");

const router = express.Router();

router.post(
  "/createCollector",
  verifyToken,
  passwordHasher,
  createCollectorAccount
);

router.post(
  "/createDistributor",
  verifyToken,
  passwordHasher,
  createDistributorAccount
);

router.post("/updateAdmin:id", verifyToken, updateAdminAccount);
router.post("/blockDonor:id", verifyToken, blockDonorAccount);
router.post("/fireCollector:id", verifyToken, destroyCollectorAccount);
router.post("/fireDistributor:id", verifyToken, destroyDistributorAccount);
router.post("/ublockDonor:id", verifyToken, unblockDonorAccount);
router.post("/updateCollector:id", verifyToken, updateCollectorAccount);
router.post("/updateDistributor:id", verifyToken, updateDistributorAccount);
router.get("/getAllCollectors", verifyToken, getAllCollectors);
router.get("/getAllDistributors", verifyToken, getAllDistributors);
router.get("/getAllDonors", verifyToken, getAllDonors);

module.exports = router;
