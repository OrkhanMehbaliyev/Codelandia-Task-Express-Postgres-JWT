const userController = require("../controllers/user-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const express = require("express");

const router = express.Router();

router.get("/getallusers", authMiddleware, userController.getAllUsers);
router.get("/getbyid/:id", authMiddleware, userController.getUserById);

router.get(
  "/getuserbyusername/:username",
  authMiddleware,
  userController.getUserByUsername
);
router.post("/", userController.addUser);

module.exports = router;
