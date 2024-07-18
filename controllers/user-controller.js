const userService = require("../services/user-service");

const getAllUsers = async (req, res) => {
  const result = await userService.getAllUsers();
  res.json(result);
};

const getUserById = async (req, res) => {
  const result = await userService.getOneUser(req.params.id);
  res.json(result);
};

const getUserByUsername = async (req, res) => {
  const result = await userService.getUserByUsername(req.params.username);
  res.json(result);
};

const addUser = async (req, res) => {
  const result = await userService.addUser(req.body);
  res.json(result);
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByUsername,
  addUser,
};
