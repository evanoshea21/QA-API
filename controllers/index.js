const models = require('../models');

module.exports = {

  getFromID: function(req,res) {
    // send to models with appropriate body
    var params = req.params;
    console.log('req params', params);
    // res.send('YUPPP');

    models.getFromID(params.id)
    .then((response) => {
      console.log('Success in models to controllers', response);
      res.send(response);
    })
    .catch(err => {
      res.send('error in controllers getFromID ', err);
    })

  }


}