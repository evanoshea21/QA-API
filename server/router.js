const router = require('express').Router();
const controllers = require('../controllers')


router.get('/qa/questions/:id', controllers.getFromID);
// router.post('/qa/questions', controllers.post);



module.exports = router;