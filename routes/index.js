const express = require("express");
const userRoute = require("../routes/userRoute");
const booksRoute = require("../routes/booksRoute");
const authRoute = require("../routes/authRoute");
const authMiddleware = require("../middlewares/auth-middleware");
const router = express.Router();

router.use("/user", userRoute);
router.use("/books", authMiddleware, booksRoute);
router.use("/auth", authRoute);

module.exports = router;
