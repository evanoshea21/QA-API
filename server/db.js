// get the client
require('dotenv').config();
const mysql = require('mysql2');
console.log('passowrd', process.env.DB_PASSWORD, 'host', process.env.DB_HOST)

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  // password: process.env.DB_PASSWORD,
  // port: 3306,
  database: 'SDC'
});

connection.connect((err) => {
  if (err) {
    console.log("Database Connection Failed..\n", err);
  } else {
    console.log("connected to Database");
  }
});

module.exports = connection;