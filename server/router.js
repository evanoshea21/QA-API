const router = require('express').Router();
const controllers = require('../controllers')


router.get('/qa/questions', controllers.get);
router.post('/qa/questions', controllers.get);



export default router;