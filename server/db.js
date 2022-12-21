// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'aws-link-to-db',
  user: 'admin',
  database: 'QA-DB'
});

module.exports = connection;