const express = require("express");
require("express-async-errors");
const cors = require("cors");
const dotenv = require("dotenv");
const dbConfig = require("./db-instance");

dotenv.config({ path: ".env" });
const app = express();
app.use(cors());
app.use(express.json());

/**
 * Starts the server by authenticating the database connection
 */

const startServer = async () => {
  console.log(process.env.DB_NAME);
  await dbConfig.authenticate();
  console.log("Database connection established successfully.");
  await dbConfig.sync();
  console.log("Database synchronized successfully.");
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
};

startServer();
