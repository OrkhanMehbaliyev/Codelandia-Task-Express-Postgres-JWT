class Error {
  constructor(type, message = null, description = null) {
    this.type = type;
    this.message = message;
    this.description = description;
  }
}

module.exports = Error;
