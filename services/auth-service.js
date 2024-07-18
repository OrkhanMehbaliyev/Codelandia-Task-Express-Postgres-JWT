const jwt = require("jsonwebtoken");
const AccessToken = require("../utils/AccessToken");
const userService = require("../services/user-service");
const { ErrorResult, SuccessResult } = require("../utils/results");
const bcrypt = require("bcrypt");
const User = require("../models/user/user");
require("dotenv").config();

const loginUser = async (user) => {
  const userExistingResult = await userService.getUserByUsername(user.username);

  if (userExistingResult.success && userExistingResult.data == null)
    return new ErrorResult("USER DOES NOT EXIST");

  console.log(userExistingResult);
  const passwordCheckResult = await bcrypt.compare(
    user.password,
    userExistingResult.data.password
  );

  if (!passwordCheckResult) return new ErrorResult("Incorrect password");

  const token = await jwt.sign(
    { username: userExistingResult.data.username },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1m" }
  );

  const expireDate = new Date();
  expireDate.setHours(expireDate.getHours() + 1);
  const accessToken = new AccessToken(token, expireDate.toString());
  return new SuccessResult("User logged in successfully", accessToken);
};

module.exports = {
  loginUser,
};
