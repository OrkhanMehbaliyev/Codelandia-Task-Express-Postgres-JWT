const { Result } = require("./Results");

class TransferResult {
  /**
   *
   * @param {Result} response
   * @param {number} statusCode
   */
  constructor(response, statusCode) {
    this.response = response;
    this.statusCode = statusCode;
  }
}

/**
 *
 * @param {Result} response
 * @param {number} statusCode
 */
const Transfer = (response, statusCode) =>
  new TransferResult(response, statusCode);

module.exports = {
  TransferResult,
  Transfer,
};
