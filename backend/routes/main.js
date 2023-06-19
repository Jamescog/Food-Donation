const express = require("express");
const donorRouter = require("./donor");
const adminRouter = require("./admin");

const mainRouter = express.Router();

mainRouter.use("/donor", donorRouter);
mainRouter.use("/admin", adminRouter);

module.exports = mainRouter;
