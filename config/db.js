const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();
module.exports = function getPool() {
  const config = {
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    debug: false,
    waitForConnections: true,
    multipleStatements: true,
  };
  pool = mysql.createPool(config);
  return pool;
};
