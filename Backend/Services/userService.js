const connection = require("../dbService");
let instance = null;

class User {
  static getUserInstance() {
    return instance ? instance : new User();
  }

  // authenticate user
  async authenticate(username, password, type) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query =
          "SELECT * FROM users WHERE username = ? and password = ? and type = ?;";

        connection.query(query, [username, password, type], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = User;
