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
  async insertNewReservation(cusid, tableno, date, time, noOfPeople) {
    try {
      const insertId = await new Promise((resolve, reject) => {
        const query =
          "insert into table_reservation (cusID,tableNo,date,time,no_of_people) values (?,?,?,?,?);";

        connection.query(
          query,
          [cusid, tableno, date, time, noOfPeople],
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
        reservationId: insertId,
        cusid,
        tableno,
        date,
        time,
        noOfPeople,
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
