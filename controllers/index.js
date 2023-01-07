const models = require('../models');
const server = require('../server/index.js');

// const {sayHi} = require('../server/index.js');

module.exports = {

  test: function(req,res) {
    console.log('test req..');
    res.send('http requests working!!');
  },

  getQFromID: async function(req,res) {
    const {redisClient} = server;
    var productID = req.query.product_id;
    console.log('PRODUCT ID --->', productID);
    console.log('processPid in controllers', process.pid);

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
    // const cachedData = await redisClient.get(`question_id:${questionID}`);
    // if(cachedData) {
    //   console.log('GETTING CACHED!');
    //   // console.log('res', JSON.parse(cachedData));
    //   return res.json(JSON.parse(cachedData));
    // }
    // console.log('NO CACHE AVAILABLE..must set after get');

    //NO CACHE -- set redis cache after DB Query
    models.getAFromID(questionID)
    .then((response) => {
      // console.log('Success in models to controllers', response);
      //SET REDIS KEY VALUE, then send response
      // redisClient.set(`question_id:${questionID}`, JSON.stringify(response));
      res.send(response);
    })
    .catch(err => {
      res.send(err);
    })
    // res.send('done with get');
  },


  postQ: async function(req,res) {

    const {redisClient} = server;
    console.log('posting....?');
    var productID = req.query.product_id;
    console.log('PRODUCT ID for post--->', req.body.productID);

    //check Cache (Redis Client GET)
    const cachedData = await redisClient.get(`product_id:${req.body.productID}`);
    if(cachedData) {
      console.log('Cache exists... deleting');
      //delete cache here
    }
    console.log('No Cache.. nothing to delete..');

    //NO CACHE -- set redis cache after DB Query
    models.postQ(req.body)
    .then((response) => {
      // console.log('Success in models to controllers', response);
      //SET REDIS KEY VALUE, then send response
      res.send(response);
    })
    .catch(err => {
      res.send(err);
    })
    // res.send('done with get');
  },

  putQ: function(req,res) { //type = helpful / reported // id of Q
    const {redisClient} = server;
    var qID = req.params.question_id;
    var type = req.params.type;
    console.log('qid: ', qID, ' type: ', type);

    //putQ, then get productId, then delete cache based on productID

    models.putQ(qID, type)
    .then(response => {
      res.send(response);
      return models.getIdFromQ(qID);//promise that resolves
    })
    .then(response => {
      var productID = response[0].product_id;
      console.log('reached cache DELETE');
      //delete cache with ^
      redisClient.del(`product_id:${productID}`);
    })
    .catch(err => {
      console.log('ERROR', err);
      res.send(err);
    })
  },
  putA: function(req,res) {
    // const {redisClient} = server;
    var aID = req.params.answer_id;
    var type = req.params.type;
    console.log('aid: ', aID, ' type: ', type);

    //putQ, then get productId, then delete cache based on productID

    models.putA(aID, type)
    .then(response => {
      res.send(response);
    })
    .catch(err => {
      console.log('ERROR', err);
      res.send(err);
    })
  },

  loader: function(req,res) {
    res.sendFile(`/Users/evanoshea/Documents/CODING/HrSenior/backend-repo/sdc-qa/loaderio-9a523eb9d3ede9cbc44fc521fd5c1d58.txt`);
  },

  getQFromIDRandom: function(req,res) {
    //get random number between 1 and 1000011
    var randProductID = Math.floor(Math.random() * 1000011);
    //call getQ from is
    models.getQFromID(randProductID)
    .then((response) => {
      // console.log('Success in models to controllers', response);
      //SET REDIS KEY VALUE, then send response
      // redisClient.set(`product_id:${randProductID}`, JSON.stringify(response));
      res.send(response);
    })
    .catch(err => {
      res.send(err);
    })
  },

  getAFromIDRandom: function(req,res) {
    //get random number between 1 and 3518963
    var randQID = Math.floor(Math.random() * 3518963);
    //call getA from is
    models.getAFromID(randQID)
    .then((response) => {
      // console.log('Success in models to controllers', response);
      //SET REDIS KEY VALUE, then send response
      // redisClient.set(`question_id:${questionID}`, JSON.stringify(response));
      res.send(response);
    })
    .catch(err => {
      res.send(err);
    })
  }



}