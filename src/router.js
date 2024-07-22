const express = require('express');
const randomSearchRoute = require('./function/serch/randomSearch');
const searchRoute = require('./function/serch/search');

const router = express.Router();

router.use('/random-search', randomSearchRoute);
router.use('/search', searchRoute);

module.exports = router;
