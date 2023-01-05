const connection = require('../server/db');


module.exports = {

  getIdFromQ: function(qID) {

    return new Promise((resolve, reject) => {
      const qString = `SELECT product_id FROM Questions WHERE id=?`;
      connection.query(qString, [qID], function(err, fields) {
        err ? reject(err) : resolve(fields);
      })

    })
  },

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

    var queryStr1 = `SELECT * FROM Answers WHERE question_id = ?`;
    // var queryStr2 = `SELECT * FROM Answers a, Photos p WHERE a.id=p.answer_id AND a.question_id = ?`;
    // var queryStr3 = `SELECT * FROM Answers a LEFT JOIN Photos p ON a.id=p.answer_id WHERE a.question_id = ?`; //postgres has Planner for JOINS, cli for ReqTime
    // simple query
    return new Promise((resolve, reject) => {

      connection.query(
        queryStr1,
        [question_id],
        function(err, results, fields) {
          if(err) {
            reject(err);
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
    })

  },

  postA: function(body) {

  },

  putQ: function(qID, type) { // type (helpful or reported) + q_ID

    return new Promise((resolve, reject) => {
      const qStringReport = `UPDATE Questions SET reported=NOT reported WHERE id=?`;
      const qStringHelp = `UPDATE Questions SET helpful=helpful+1 WHERE id=?`;
      if(type === 'report') {
        connection.query(qStringReport, [qID], function(err) {
          err ? reject(err) : resolve(`updated Qid (${qID}) for ${type}`)
        })
      } else {
        connection.query(qStringHelp, [qID], function(err) {
          err ? reject(err) : resolve(`updated Qid (${qID}) for ${type}`)
        })
      }//else

    })//END promise

  },
  putA: function(aID, type) { //  type (helpful or reported) + A_ID

    return new Promise((resolve, reject) => {
      const qStringReport = `UPDATE Answers SET reported=NOT reported WHERE id=?`;
      const qStringHelp = `UPDATE Answers SET helpful=helpful+1 WHERE id=?`;
      if(type === 'report') {
        connection.query(qStringReport, [aID], function(err) {
          err ? reject(err) : resolve(`updated Aid (${aID}) for ${type}`)
        })
      } else {
        connection.query(qStringHelp, [aID], function(err) {
          err ? reject(err) : resolve(`updated Aid (${aID}) for ${type}`)
        })
      }//else
    })//END promise

  }



}//END module.exports



// // with placeholder
// connection.query(
//   'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
//   ['Page', 45],
//   function(err, results) {
//     console.log(results);
//   }
// );