const connection = require("../dbService");
let instance = null;

class User {
  static getUserInstance() {
    return instance ? instance : new User();
  }

  // authenticate user
  async authenticate(username, password) {
    try {
      const response = await new Promise((resolve, reject) => {
        let query;
        if (username == "admin") {
          query =
            "SELECT * FROM users WHERE username = ? and password = ? and type = 'admin';";
        } else {
          query =
            "SELECT * FROM users WHERE username = ? and password = ? and type = 'staff';";
        }

        connection.query(query, [username, password], (err, results) => {
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
