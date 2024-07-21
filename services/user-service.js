const pool = require("../config/db");
const bcrypt = require("bcrypt");
const { ErrorResult, SuccessResult } = require("../utils/Results");
const User = require("../models/user/user");
const { USER_MESSAGES } = require("../utils/messages/user-messages");
const Error = require("../utils/Error");
const SYSTEM_ERRORS = require("../utils/messages/system-messages");
const { Transfer } = require("../utils/Transfer");

const getAllUsers = async () => {
  const result = await pool.safeQuery("select * from users");

  if (result instanceof Error)
    return Transfer(new ErrorResult(SYSTEM_ERRORS.DB_ERROR, result), 501);

  if (result.rows.length == 0)
    return Transfer(new ErrorResult(USER_MESSAGES.ALL_FOUND_ERROR), 404);

  result = User.mapAll(result?.rows);
  return Transfer(new SuccessResult(USER_MESSAGES.ALL_FOUND_SUCCESS, result));
};

const getUserById = async (id) => {
  const result = await pool.safeQuery(
    "select * from userss u where u.id = $1",
    [id]
  );

  if (result instanceof Error)
    return Transfer(new ErrorResult(SYSTEM_ERRORS.DB_ERROR, result), 501);

  if (result.rows.length == 0)
    return Transfer(new ErrorResult(USER_MESSAGES.FOUND_ERROR), 404);

  const user = User.mapOne(result.rows[0]);
  return Transfer(SuccessResult(USER_MESSAGES.FOUND_SUCCESS, user), 200);
};

const getUserByUsername = async (username) => {
  const result = await pool.safeQuery(
    "select * from users u where u.username = $1",
    [username]
  );

  if (result instanceof Error)
    return Transfer(new ErrorResult(SYSTEM_ERRORS.DB_ERROR, result), 501);

  if (result.rows.length == 0)
    return Transfer(new ErrorResult(USER_MESSAGES.FOUND_ERROR), 404);

  const user = User.mapOne(result.rows[0]);
  return Transfer(new SuccessResult(USER_MESSAGES.FOUND_SUCCESS, user), 200);
};

const addUser = async (user) => {
  user = User.mapOne(user);

  const { response } = await getUserByUsername(user.username);

  if (!response?.success && !response?.data)
    return Transfer(new ErrorResult(USER_MESSAGES.DUPLICATE_USERNAME), 400);

  user.password = await bcrypt.hash(user.password, 10);

  const result = await pool.safeQuery("call add_user($1, $2)", [
    user.username,
    user.password,
  ]);

  if (result instanceof Error)
    return Transfer(new ErrorResult(SYSTEM_ERRORS.DB_ERROR, result), 501);

  return Transfer(new SuccessResult(USER_MESSAGES.CREATED_SUCCESS, user), 200);
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByUsername,
  addUser,
};
