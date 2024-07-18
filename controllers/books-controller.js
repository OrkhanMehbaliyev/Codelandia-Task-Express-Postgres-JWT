const bookService = require("../services/books-service");

const getAllBooks = async (req, res) => {
  const result = await bookService.getAllBooks();
  res.json(result);
};

const getBookById = async (req, res) => {
  const result = await bookService.getBookById(req.params.id);
  res.json(result);
};

const addBooks = async (req, res) => {
  const result = await bookService.addBook(req.body);
  res.json(result);
};

const deleteBookById = async (req, res) => {
  const result = await bookService.deleteBookById(req.params.id);
  res.json(result);
};

module.exports = {
  getAllBooks,
  getBookById,
  addBooks,
  deleteBookById,
};
