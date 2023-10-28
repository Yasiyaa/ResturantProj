const connection = require("../dbService");
let instance = null;

class Customer {
  static getCustomerInstance() {
    return instance ? instance : new Customer();
  }

  //get all customer data
  async getAllData() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM customer;";

        connection.query(query, (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      // console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  // insert new customer to the table
  async insertNewCustomer(name, address, telephone, email, password) {
    try {
      const insertId = await new Promise((resolve, reject) => {
        const query =
          "INSERT INTO customer (name, address, telephone, email, password) VALUES (?,?,?,?,?);";

        connection.query(
          query,
          [name, address, telephone, email, password],
          (err, result) => {
            if (err) {
              reject(new Error(err.message));
            } else {
              resolve(result.insertId);
            }
          }
        );
      });

      return {
        customerID: insertId, // Assuming the column name is 'customerID' in your table
        name,
        address,
        telephone,
        email,
        password,
      };
    } catch (error) {
      console.log(error);
      throw error; // Optionally, rethrow the error to handle it further up the call stack
    }
  }

   // delete customer 
  async deleteCustomerById(id) {
    try {
      id = parseInt(id, 10);
      const response = await new Promise((resolve, reject) => {
        const query = "DELETE FROM customer WHERE customerID = ?";

        connection.query(query, [id], (err, result) => {
          if (err) {
            reject(new Error(err.message));
          } else {
            resolve(result.affectedRows);
            console.log("deleted success");
          }
        });
      });

      return response === 1;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async updateNameById(id, name) {
    try {
      id = parseInt(id, 10);
      const response = await new Promise((resolve, reject) => {
        const query = "UPDATE customer SET name = ?,address =  WHERE id = ?";

        connection.query(query, [name, id], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result.affectedRows);
        });
      });

      return response === 1 ? true : false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

// authenticate user
  async authenticate(email,password) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM customer WHERE email = ? and password = ?;";

        connection.query(query, [email,password], (err, results) => {
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

module.exports = Customer;
