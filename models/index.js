const connection = require('../server/db');


module.exports = {

  getFromID: function(product_id) {
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