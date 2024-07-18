const userController = require("../controllers/user-controller");
const express = require("express");

const router = express.Router();

router.get("/getallusers", userController.getAllUsers);
router.get("/getoneuser/:id", userController.getUserById);

router.get("/getuserbyusername/:username", userController.getUserByUsername);
router.post("/", userController.addUser);

module.exports = router;
