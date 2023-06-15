const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config({ path: ".env" });

const database = process.env.DB_NAME;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
console.log(host);
console.log(port);
console.log(user);
console.log(password);
/**
 * Create a new instance of sequelize and establish a connection to the database
 */

const conn = new Sequelize(database, user, password, {
  host: host,
  dialect: "mysql",
});

module.exports = conn;
