const User = require("../models/user/user");
const authService = require("../services/auth-service");

const loginUser = async (req, res) => {
  const result = await authService.loginUser(User.mapOne(req.body));
  if (!result.success) res.status(401).json(result);
  else res.status(200).json(result);
};

module.exports = {
  loginUser,
};
