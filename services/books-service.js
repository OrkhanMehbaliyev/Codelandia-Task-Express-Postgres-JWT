const pool = require("../config/db");
const Book = require("../models/book/book");
const BOOK_MESSAGES = require("../utils/messages/book-messages");
const { ErrorResult, SuccessResult } = require("../utils/Results");
const { Transfer } = require("../utils/Transfer");

const getBookById = async (id) => {
  const result = await pool.safeQuery("select * from books b where b.id = $1", [
    id,
  ]);

  if (result instanceof Error)
    return Transfer(new ErrorResult(SYSTEM_ERRORS.DB_ERROR, result), 501);

  if (result.rows.length != 0) return Transfer(BOOK_MESSAGES.FOUND_ERROR, 404);

  result = Book.mapAll(result.rows);

  return new SuccessResult(BOOK_MESSAGES.FOUND_SUCCESS, result);
};

//HERE
const getAllBooks = async () => {
  const result = await pool.safeQuery("select * from books");

  if (result instanceof Error)
    return Transfer(new ErrorResult(SYSTEM_ERRORS.DB_ERROR, result), 501);

  result = Book.mapAll(result.rows);
  return new SuccessResult("Book found successfully", result);
};

const addBook = async (book) => {
  book = Book.mapOne(book);
  const result = await pool.safeQuery("call add_book($1,$2,$3,$4)", [
    book.title,
    book.author,
    book.publish_date,
    book.isbn,
  ]);
  return new SuccessResult("Book added sucessfully!", book);
};

const deleteBookById = async (id) => {
  const result = await pool.safeQuery("delete from books where id = $1", [id]);
  return new SuccessResult("Book deleted successfully");
};

module.exports = {
  getBookById,
  getAllBooks,
  addBook,
  deleteBookById,
};
