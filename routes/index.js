const express = require("express");
const userRoute = require("../routes/userRoute");
const booksRoute = require("../routes/booksRoute");
const authRoute = require("../routes/authRoute");

const router = express.Router();

router.use("/user", userRoute);
router.use("/books", booksRoute);
router.use("/auth", authRoute);

module.exports = router;
