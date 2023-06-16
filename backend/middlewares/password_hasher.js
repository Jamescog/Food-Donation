const bcrypt = require("bcrypt");

/**
 * Middleware that hashes the password in the request body using bcrypt.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 * @author Yaekob Demisse
 */

exports.passwordHasher = async (req, res, next) => {
  const { password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  req.body.password = hash;
  next();
};
