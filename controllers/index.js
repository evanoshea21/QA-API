const models = require('../models');

module.exports = {

  getQFromID: function(req,res) {
    // send to models with appropriate body
    var query = req.query;
    console.log('req query', query);
    // var params = req.params;
    // console.log('req params', params);

    models.getFromID(query.product_id)
    .then((response) => {
      console.log('Success in models to controllers', response);
      res.send(response);
    })
    .catch(err => {
      res.send('error in controllers getFromID ', err);
    })

  },

  post: function(req, res) {

    models.postQ(req.body)
    .then(response => {
      res.send(response);
    })
  }


}