const jwt = require("jsonwebtoken");
const AccessToken = require("../utils/AccessToken");
const userService = require("../services/user-service");
const { ErrorResult, SuccessResult } = require("../utils/Results");
const bcrypt = require("bcrypt");
const { Transfer } = require("../utils/Transfer");
const { USER_MESSAGES } = require("../utils/messages/user-messages");
require("dotenv").config();

const loginUser = async (user) => {
  const { response, statusCode } = await userService.getUserByUsername(
    user.username
  );

  if (!response?.success || !response?.data)
    return Transfer(response, statusCode);

  const passwordCheckResult = await bcrypt.compare(
    user?.password,
    response?.data.password
  );

  if (!passwordCheckResult)
    return Transfer(new ErrorResult(USER_MESSAGES.PASSWORD_INCORRECT), 400);

  const token = await jwt.sign(
    { username: response?.data.username },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1h" }
  );

  const expireDate = new Date();
  expireDate.setHours(expireDate.getHours() + 1);
  const accessToken = new AccessToken(token, expireDate.toString());
  return Transfer(
    new SuccessResult(USER_MESSAGES.LOGIN_SUCCESS, accessToken),
    200
  );
};

module.exports = {
  loginUser,
};
