const express = require('express');
const randomSearchRoute = require('./function/serch/randomSearch');
const searchRoute = require('./function/serch/search');
const apiUserController = require('./api/user/controller');
const authenticateToken = require('./middleware/authenticate');

const router = express.Router();

router.use('/random-search', randomSearchRoute);
router.use('/search', searchRoute);




use(authenticateToken);
router.get('/api/user/my', apiUserController.show);
router.post('/api/user/my', apiUserController.update);


module.exports = router;
