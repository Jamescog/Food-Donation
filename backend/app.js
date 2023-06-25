const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const dbConfig = require("./db-instance");
const router = require("./routes/main");
const path = require("path");
morgan = require("morgan");

dotenv.config({ path: ".env" });
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api", router);
app.use(express.static(path.join(__dirname, "../frontend")));
app.use(express.static(path.join(__dirname, "../frontend/admin")));
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
