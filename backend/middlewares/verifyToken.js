const Donor = require("../models/donor");
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");

exports.verifyToken = async (req, res, next) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      const token = req.headers.authorization.split(" ")[1];
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.email) {
          let user;
          if (decoded.email.startsWith("admin")) {
            user = await Admin.findOne({ where: { email: decoded.email } });
          } else {
            user = await Donor.findOne({ where: { email: decoded.email } });
          }

          if (user) {
            req.user = user;
            return next();
          }
        }
      } catch (error) {
        if (error.name === "TokenExpiredError") {
          return res.status(401).json({ error: "Token expired" });
        }
        throw error;
      }
    }
    return res.status(401).json({ error: "Unauthorized" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
