const connection = require("../db/conn");

class User {
  static getByEmail(email) {
    const selectByEmailQuery = 'SELECT * FROM users WHERE email = ?';
    return new Promise((resolve, reject) => {
      connection.query(selectByEmailQuery, [email], (error, results) => {
        if (error) {
          reject(error);
        } else {
          const user = results.length > 0 ? results[0] : null;
          resolve(user);
        }
      });
    });
  }
}

module.exports = User;
