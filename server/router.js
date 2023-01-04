const router = require('express').Router();
const controllers = require('../controllers')

router.get('/test', controllers.test);

router.get('/qa/questions', controllers.getQFromID);
router.get('/qa/questions/:question_id/answers', controllers.getAFromID);

router.put('/qa/questions/q/:question_id/:type', controllers.putQ);
router.put('/qa/questions/a/:answer_id/:type', controllers.putA);

router.post('/qa/questions', controllers.postQ);



module.exports = router;