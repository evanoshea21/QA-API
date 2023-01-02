const router = require('express').Router();
const controllers = require('../controllers')


router.get('/qa/questions', controllers.getQFromID);
router.get('/qa/questions/:question_id/answers', controllers.getAFromID);
router.post('/qa/questions', controllers.post);



module.exports = router;