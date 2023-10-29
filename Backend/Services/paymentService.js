const connection = require("../dbService");
let instance = null;

class Payment {
  static getPaymentInstance() {
    return instance ? instance : new Payment();
  }

  //get all payment data
  async getAllData() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM payment;";

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

  // add new payment
  async insertNewPayment(cusid, oid, amount, date) {
    try {
      const insertId = await new Promise((resolve, reject) => {
        const query =
          "INSERT INTO `payment`( `cusID`, `OID`, `amount`, `date`) VALUES (?,?,?,?);";

        connection.query(query, [cusid, oid, amount, date], (err, result) => {
          if (err) {
            reject(new Error(err.message));
          } else {
            resolve(result.insertId);
          }
        });
      });

      return {
        cusid,
        oid,
        amount,
        date,
      };
    } catch (error) {
      console.log(error);
      throw error; 
    }
  }
}

module.exports = Payment;
