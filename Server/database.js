const mysql = require("mysql");

const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  charset: "utf8mb4",
  multipleStatements: true,
  debug: false
});

conn.connect(function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Database Connected");
  }
});

module.exports = conn;
