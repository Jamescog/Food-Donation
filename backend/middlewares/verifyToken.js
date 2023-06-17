const Donor = require("../models/donor");
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");

/**
 * This middleware is used to verify the token sent by the client.
 * If the token is valid, the user is allowed to access the protected route.
 * @param{Object} req - Request object
 * @param{Object} res - Response object
 * @param{Function} next - Next function
 * @returns {void}
 * Author: Yaekob Demisse
 */

exports.verifyToken = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.email) {
      const donor = await Donor.findOne({ where: { email: decoded.email } });
      if (donor) {
        req.user = donor;
        return next();
      }
    }
  } else {
    return res.status(401).json({ error: "Authorization header not found" });
  }
};
