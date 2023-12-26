const mysql = require("mysql");

const pool = mysql.createPool({
  connectionLimit: 10, // Adjust as needed
  host: "localhost",
  user: "root",
  password: "",
  database: "nodemandir",
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error getting MySQL connection from pool:", err);
    return;
  }
  connection.release(); // Release the connection back to the pool
});

module.exports = pool;
