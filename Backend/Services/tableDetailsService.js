const connection = require("../dbService");
let instance = null;

class Table {
  static getTableInstance() {
    return instance ? instance : new Table();
  }

  //get all table data
  async getAllData() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM table_detail;";

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

  // insert new  table
  async insertNewTable( seating, slots) {
    try {
      const insertId = await new Promise((resolve, reject) => {
        const query =
          "INSERT INTO `table_detail`( `seatingCapacity`, `slots`) VALUES (?,?)";

        connection.query(query, [seating, slots], (err, result) => {
          if (err) {
            reject(new Error(err.message));
            console.log(query)
          } else {
            resolve(result.insertId);
          }
        });
      });

      return {
        tableID: insertId,
        seating,
        slots,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }


}


module.exports = Table;
