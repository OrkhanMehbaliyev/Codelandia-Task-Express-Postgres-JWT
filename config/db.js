const HandlePool = require("../utils/Pool");

require("dotenv").config();

const pool = new HandlePool({
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
});

module.exports = pool;
