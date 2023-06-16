const express = require("express");
require("express-async-errors");
const cors = require("cors");
const dotenv = require("dotenv");
const dbConfig = require("./db-instance");

dotenv.config({ path: ".env" });
const app = express();
app.use(cors());
app.use(express.json());

const models = require("./models/relationships");
/**
 * Starts the server by authenticating the database connection
 */

const startServer = async () => {
  await dbConfig.authenticate();
  console.log(`Connected to Database`);
  await dbConfig.sync();

  app.listen(process.env.PORT, () => {
    console.log(
      `The server is running at http://localhost:${process.env.PORT}`
    );
  });
};

startServer();
