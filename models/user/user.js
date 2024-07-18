class User {
  constructor(props) {
    this.username = props?.username;
    this.password = props?.password;
  }

  static mapAll(rows) {
    return rows.map((row) => new User(row));
  }

  static mapOne(row) {
    return new User(row);
  }
}

module.exports = User;
