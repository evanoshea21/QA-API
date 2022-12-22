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

  },

  postQ: function(body) {
    return new Promise((resolve, reject) => {
      var str = '';
      Object.keys(body).forEach((key, i) => {
        str += '?, '
        Object.values(body)[i]
      })
      Qstr = str.slice(0, -1);
      //do something async, then resolve
      connection.query(
        `INSERT INTO Questions (${Qstr}) values()`,
        [],
        function(err) {
          err ? reject(err) : resolve('successfully added to db');
        }
      )

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