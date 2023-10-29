const connection = require("../dbService");
let instance = null;

class Order {
  static getOrderInstance() {
    return instance ? instance : new Order();
  }

  //get all order data
  async getAllData() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM food_order;";

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

  // insert new order
  async insertNewOrder(cusid, date, total, ispaid, orderType, orderStatus) {
    try {
      const insertId = await new Promise((resolve, reject) => {
        const query =
          "INSERT INTO `food_order`( `cusID`, `date`, `total`, `isPaid`, `orderType`, `orderStatus`) VALUES (?,?,?,?,?,?)";

        connection.query(
          query,
          [cusid, date, total, ispaid, orderType, orderStatus],
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
        OrderID: insertId,
        cusid,
        date,
        total,
        ispaid,
        orderType,
        orderStatus,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // update order status
  async updateOrder(id, orderStatus) {
    try {
      id = parseInt(id, 10);
      const response = await new Promise((resolve, reject) => {
        const query =
          "UPDATE `food_order` SET `orderStatus`= ? WHERE orderID = ? ";

        connection.query(query, [orderStatus, id], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result.affectedRows);
        });
      });

      if( response === 1){
        return{
            orderID: id,
            orderStatus :orderStatus
        }
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

module.exports = Order;
