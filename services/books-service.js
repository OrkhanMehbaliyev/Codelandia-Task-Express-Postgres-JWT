const pool = require("../config/db");
const Book = require("../models/book/book");
const { ErrorResult, SuccessResult } = require("../utils/results");

const getBookById = async (id) => {
  const result = await pool.query("select * from books b where b.id = $1", [
    id,
  ]);

  const book = Book.mapOne(result.rows[0]);
  if (book == null) return new ErrorResult("Book was not found!");
  return new SuccessResult("Book found successfully", book);
};

const getAllBooks = async () => {
  const result = await pool.query("select * from books");

  result = Book.mapAll(result.rows);
  return new SuccessResult("Book found successfully", result);
};

const addBook = async (book) => {
  book = Book.mapOne(book);
  const result = await pool.query("call add_book($1,$2,$3,$4)", [
    book.title,
    book.author,
    book.publish_date,
    book.isbn,
  ]);
  return new SuccessResult("Book added sucessfully!", book);
};

const deleteBookById = async (id) => {
  const result = await pool.query("delete from books where id = $1", [id]);
  return new SuccessResult("Book deleted successfully");
};

module.exports = {
  getBookById,
  getAllBooks,
  addBook,
  deleteBookById,
};
