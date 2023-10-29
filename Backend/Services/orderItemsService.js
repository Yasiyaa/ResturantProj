const connection = require("../dbService");
let instance = null;

class orderItems {
  static getOrderItemsInstance() {
    return instance ? instance : new orderItems();
  }

  //get all order items data
  async getAllData() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM order_items;";

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
  async insertNewOrderItems(oid, mid, qty) {
    try {
      const insertId = await new Promise((resolve, reject) => {
        const query =
          "INSERT INTO `order_items`(`OID`, `mID`, `qty`) VALUES (?,?,?)";

        connection.query(query, [oid, mid, qty], (err, result) => {
          if (err) {
            reject(new Error(err.message));
          } else {
            resolve(result.insertId);
          }
        });
      });

      return {
        oid,
        mid,
        qty,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = orderItems;
