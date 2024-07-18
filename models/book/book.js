class Book {
  constructor(props) {
    this.title = props?.title;
    this.author = props?.author;
    this.publish_date = props?.publish_date;
    this.isbn = props?.isbn;
  }

  static mapAll(rows) {
    return rows.map((row) => new Book(row));
  }

  static mapOne(row) {
    return new Book(row);
  }
}

module.exports = Book;
