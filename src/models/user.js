const connection = require("../db/conn");

class User {
  static getByEmail(email, request) {
    const selectByEmailQuery = 'SELECT * FROM users WHERE email = ?';
    return new Promise((resolve, reject) => {
      connection.query(selectByEmailQuery, [email], (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (results.length > 0) {
            // Assuming you want to store user_id in the session
            request.session.user_id = results[0].id;
            console.log(request.session);
          }
  
          const user = results.length > 0 ? results[0] : null;
          resolve(user);
        }
      });
    });
  }
  
}

module.exports = User;
