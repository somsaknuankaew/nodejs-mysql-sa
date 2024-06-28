/* const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();
module.exports = function getPool() {
  const config = {
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  };
  pool = mysql.createPool(config);
  return pool;
}; */
const mysql = require("mysql2/promise");
require("dotenv").config(); // โหลดตัวแปรสภาพแวดล้อมจากไฟล์ .env
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  //connectionLimit: process.env.DB_CONNECTION_LIMIT
});

module.exports = pool;
