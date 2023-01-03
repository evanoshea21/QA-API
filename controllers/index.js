const models = require('../models');
const server = require('../server/index.js');

// const {sayHi} = require('../server/index.js');

module.exports = {

  test: function(req,res) {
    console.log('test GET');
    res.send('working?');
  },

  getQFromID: async function(req,res) {
    const {redisClient} = server;
    console.log('getting....?');
    var productID = req.query.product_id;
    console.log('PRODUCT ID ------>', productID);

    //check Cache (Redis Client GET)
    const cachedData = await redisClient.get(`product_id:${productID}`);
    if(cachedData) {
      console.log('GETTING CACHED!');
      return res.json(JSON.parse(cachedData));
    }
    console.log('NO CACHE AVAILABLE..must set after get');

    //NO CACHE -- set redis cache after DB Query
    models.getQFromID(productID)
    .then((response) => {
      // console.log('Success in models to controllers', response);
      //SET REDIS KEY VALUE, then send response
      redisClient.set(`product_id:${productID}`, JSON.stringify(response));
      res.send(response);
    })
    .catch(err => {
      res.send(err);
    })
    // res.send('done with get');
  },

  getAFromID: async function(req,res) {
    const {redisClient} = server;

    // var questionID = req.query.question_id;
    var questionID = req.params.question_id;
    console.log('questionID---->', questionID);
    // console.log('question id', questionID);

    //check Cache (Redis Client GET)
    const cachedData = await redisClient.get(`question_id:${questionID}`);
    if(cachedData) {
      console.log('GETTING CACHED!');
      // console.log('res', JSON.parse(cachedData));
      return res.json(JSON.parse(cachedData));
    }
    console.log('NO CACHE AVAILABLE..must set after get');

    //NO CACHE -- set redis cache after DB Query
    models.getAFromID(questionID)
    .then((response) => {
      // console.log('Success in models to controllers', response);
      //SET REDIS KEY VALUE, then send response
      redisClient.set(`question_id:${questionID}`, JSON.stringify(response));
      res.send(response);
    })
    .catch(err => {
      res.send(err);
    })
    // res.send('done with get');
  },

  post: function(req, res) {

    models.postQ(req.body)
    .then(response => {
      res.send(response);
    })
  }


}