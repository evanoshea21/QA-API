const router = require('express').Router();
const controllers = require('../controllers')

router.get('/test', controllers.test);

router.get('/qa/questions', controllers.getQFromID);
router.get('/qa/questions/:question_id/answers', controllers.getAFromID);
//RANDOM Qs and As for testing (unable to pass in product_id, and don't want to use same redis cache)
router.get('/qa/questions/random', controllers.getQFromIDRandom);
router.get('/qa/questions/answers', controllers.getAFromIDRandom);

router.put('/qa/questions/q/:question_id/:type', controllers.putQ);
router.put('/qa/questions/a/:answer_id/:type', controllers.putA);

router.post('/qa/questions', controllers.postQ);

//LOADER.io
router.get('/loaderio-9a523eb9d3ede9cbc44fc521fd5c1d58.txt', controllers.loader);



module.exports = router;