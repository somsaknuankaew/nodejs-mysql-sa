const { Pool } = require("pg");
require("dotenv").config();
const pools = new Pool({
  connectionString: process.env.PGDATABASE_URL,
});
module.exports = {
  query: (text, params) => pools.query(text, params),
};
