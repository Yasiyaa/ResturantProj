const connection = require("../dbService");
let instance = null;

class tableReservation {
  static getTableReservationInstance() {
    return instance ? instance : new tableReservation();
  }

  //get all reservations
  async getAllData() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM table_reservation ;";

        connection.query(query, (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  // create reservation
  async insertNewReservation(name, date, time, noOfPeople, email) {
    try {
      //validate booking tables with available tables and seating capacity
      let  availability = await new Promise((resolve, reject) => {
        const query =
          "SELECT * FROM `table_detail` where seatingCapacity = ? AND booked = false LIMIT 1;";

        connection.query(query, [noOfPeople], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });

      availability = availability[0];

      if (availability.tableNo) {
        // insert reservation
        const insertId = await new Promise((resolve, reject) => {
          const query =
            "INSERT INTO `table_reservation`(`name`, `date`, `time`, `no_of_people`, `email`) VALUES (?,?,?,?,?);";

          connection.query(
            query,
            [name, date, time, noOfPeople, email],
            (err, result) => {
              if (err) {
                reject(new Error(err.message));
              } else {
                resolve(result.insertId);
              }
            }
          );
        });

        // book the table
        const tableId = await new Promise((resolve, reject) => {
          const query =
            "UPDATE `table_detail` SET `booked` = 1 WHERE tableID = ?;";

          connection.query(query, [availability.tableID], (err, result) => {
            if (err) {
              reject(new Error(err.message));
            } else {
              resolve(result.insertId);
            }
          });
        });
      }

      let tableNo = availability.tableNo;

      return {
        tableNo,
        email,
        name,
      };
    } catch (error) {
      console.log(error);
    }
  }

  //update reser
  async updateReservationById(reservationId, tableno, date, time, noOfPeople) {
    try {
      reservationId = parseInt(reservationId, 10);

      const response = await new Promise((resolve, reject) => {
        const query =
          "UPDATE table_reservation SET tableNo=?, date=?, time=?, no_of_people=? WHERE reservationId=?";

        connection.query(
          query,
          [tableno, date, time, noOfPeople, reservationId],
          (err, result) => {
            if (err) {
              reject(new Error(err.message));
            } else {
              resolve(result.affectedRows);
            }
          }
        );
      });

      if (response === 1) {
        return {
          reservationId: reservationId,
          tableno: tableno,
          date: date,
          time: time,
          noOfPeople: noOfPeople,
        };
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

module.exports = tableReservation;
