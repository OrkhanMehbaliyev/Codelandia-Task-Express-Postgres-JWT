const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  const authenticationHeaders = req.headers.authorization;

  const token = authenticationHeaders.split(" ")[1];

  jwt.verify(token, process.env.MY_SECRET_KEY, (err, user) => {
    if (err) res.sendStatus(401);
    else {
      req.user = user;
      next();
    }
  });
};

module.exports = authMiddleware;
