const connection = require('../server/db');


module.exports = {

  getQFromID: function(product_id) {
    // simple query
    return new Promise((resolve, reject) => {

      connection.query(
        'SELECT * FROM Questions WHERE product_id = ?',
        [product_id],
        function(err, results, fields) {
          if(err) {
            reject('error in models', err);
          }
          resolve(results); // results contains rows returned by server
        }
      )
      });

  },

  getAFromID: function(question_id) {
    // simple query
    return new Promise((resolve, reject) => {

      connection.query(
        'SELECT * FROM Answers WHERE question_id = ?',
        [question_id],
        function(err, results, fields) {
          if(err) {
            reject('error in models', err);
          }
          resolve(results); // results contains rows returned by server
        }
      )
      });

  },

  postQ: function(body) {  //PRODUCT_ID, BODY, DATE_WRITTEN, ASKER_NAME, ASKER_EMAIL, HELP, REP
    return new Promise((resolve, reject) => {

      if(body.product_id && body.body && body.date_written && body.asker_name && body.asker_email && body.helpful && body.reported) {
        connection.query(
          `INSERT INTO Questions (product_id, body, date_written, asker_name, asker_email, helpful, reported) values(?, ?, ?, ?, ?, ?, ?)`,
          [body.product_id, body.body, body.date_written, body.asker_name, body.asker_email, body.helpful, body.reported],
          function(err) {
            err ? reject(err) : resolve('successfully added to db..?');
          }
        )//end conn.query
      } else {
        reject('body of request wrong');
      }
      // var str = '';
      // Object.keys(body).forEach((key, i) => {
      //   str += '?, '
      //   Object.values(body)[i]
      // })
      // Qstr = str.slice(0, -1);
      // console.log('Qstr ', Qstr);
      //do something async, then resolve


      //reject if async error
    })

  }


}



// // with placeholder
// connection.query(
//   'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
//   ['Page', 45],
//   function(err, results) {
//     console.log(results);
//   }
// );