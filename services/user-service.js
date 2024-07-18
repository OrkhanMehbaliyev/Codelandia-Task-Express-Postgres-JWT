const pool = require("../config/db");
const bcrypt = require("bcrypt");

const { ErrorResult, SuccessResult } = require("../utils/results");
const User = require("../models/user/user");

const getUserById = async (id) => {
  const result = await pool.query("select * from users u where u.id = $1", [
    id,
  ]);

  const user = User.mapOne(result.rows[0]);
  if (!user) return new ErrorResult("User not found");

  return new SuccessResult("User found successfully", user);
};

const getUserByUsername = async (username) => {
  const result = await pool.query(
    "select * from users u where u.username = $1",
    [username]
  );

  const user = User.mapOne(result.rows[0]);
  if (!user) return new ErrorResult("User not found");

  return new SuccessResult("User found successfully", user);
};

const addUser = async (user) => {
  user = User.mapOne(user);

  const checkingDuplicate = await getUserByUsername(user.username);
  if (checkingDuplicate.data != null)
    return new ErrorResult("Duplicate username");

  user.password = await bcrypt.hash(user.password, 10);

  const result = await pool.query("call add_user($1, $2)", [
    user.username,
    user.password,
  ]);

  return new SuccessResult("User created successfully", user);
};

module.exports = {
  getUserById,
  getUserByUsername,
  addUser,
};
