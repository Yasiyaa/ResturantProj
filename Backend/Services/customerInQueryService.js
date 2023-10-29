const connection = require('../dbService');
let instance = null;

class CustomerInqueries{

    static getCustomerInqueriesInstance() {
        return instance ? instance : new CustomerInqueries();
    }

    
    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM customer_inquiries";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            // console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async insertNewQuery(cusid, type, inquiry, status) {
        try {
           
            const insertId = await new Promise((resolve, reject) => {
                const query = "insert into customer_inquiries (cusID,type,inquiry,status) values (?,?,?,?)";

                connection.query(query, [cusid,type,inquiry,status] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);
                })
            });
            return {
                ID : insertId,
                cusID : cusid,
                type : type,
                inquiry : inquiry,
                status : status
            };
        } catch (error) {
            console.log(error);
        }
    }

    
}

module.exports = CustomerInqueries;