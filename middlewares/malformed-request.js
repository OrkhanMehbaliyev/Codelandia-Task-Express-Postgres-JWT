const { ErrorResult } = require("../utils/Results");

const malformedRequestMiddleware = async (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json(new ErrorResult("Malformed JSON"));
  }
  next();
};

module.exports = malformedRequestMiddleware;
