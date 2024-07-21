const { Pool } = require("pg");
const Error = require("./Error");

class HandlePool extends Pool {
  constructor(config = {}) {
    super(config);
  }

  async safeQuery(queryConfig, values) {
    try {
      if (values) {
        return await this.query(queryConfig, values);
      } else {
        return await this.query(queryConfig);
      }
    } catch (err) {
      return new Error("Database level error", err.message, err);
    }
  }
}

module.exports = HandlePool;
