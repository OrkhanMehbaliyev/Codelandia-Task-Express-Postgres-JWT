class Result {
  constructor(success, data = null, message = null) {
    this.success = success;
    this.data = data;
    this.message = message;
  }
}

class ErrorResult extends Result {
  constructor(message = null, data = null) {
    super(false, data, message);
  }
}

class SuccessResult extends Result {
  constructor(message = null, data = null) {
    super(true, data, message);
  }
}

module.exports = {
  ErrorResult,
  SuccessResult,
};
