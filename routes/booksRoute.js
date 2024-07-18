const express = require("express");
const bookController = require("../controllers/books-controller");

const route = express.Router();

route.get("/getbyid/:id", bookController.getBookById);
route.get("/getall", bookController.getAllBooks);
route.post("/", bookController.addBooks);
route.delete("/delete/:id", bookController.deleteBookById);

module.exports = route;
