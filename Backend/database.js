import mysql from "mysql2";

const pool = mysql
  .createPool({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "nibm",
  })
  .promise();

  
export async function getAllStudent() {
  const [rows] = await pool.query("select * from student");
  return rows;
}


export async function getstudent(id) {
  const [rows] = await pool.query(
    `
    select * from student
    where id = ?`,
    [id]
  );
  return rows[0];
}
