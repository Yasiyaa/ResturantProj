const connection = require("../dbService");
let instance = null;

class Menu {
    static getMenuInstance() {
        return instance ? instance : new Menu();
      }

  //get all menu data
  async getAllData() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM food_menu;";

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

}



module.exports = Menu;