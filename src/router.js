const express = require('express');
const searchRoute = require('./function/serch/search');
const quizRoute = require('./function/quiz/quizRoute'); // 퀴즈 라우터 추가
const quizsaveRoute = require('./function/quiz/quizsaveRoute'); // 퀴즈 저장 라우터 추가
const rankingRoute = require('./function/ranking/rankingRoute'); // 랭킹 라우터 추가

const router = express.Router();

router.use('/search', searchRoute);
router.use('/quiz', quizRoute);  // 퀴즈 라우터 사용
router.use('/quizsave', quizsaveRoute);  // 퀴즈 저장 라우터 사용
router.use('/ranking', rankingRoute);  // 랭킹 라우터 사용

module.exports = router;
