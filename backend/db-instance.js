const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config({ path: ".env" });

const database = process.env.DB_NAME;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;

/**
 * Create a new instance of sequelize and establish a connection to the database
 */

const conn = new Sequelize(database, user, password, {
  host: host,
  dialect: "mysql",
  logging: false,
});

conn
  .authenticate()
  .then(() => {
    conn.sync();
    console.log("Database connection established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

module.exports = conn;
