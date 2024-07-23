const express = require('express');
const saveQuizScore = require('./saveQuizScore');

const router = express.Router();

router.get('/', async (req, res) => {
    const name = req.query.name;
    const score = req.query.score;

    if (!name || !score) {
        return res.status(400).json({ message: '이름과 점수를 모두 입력해주세요.' });
    }

    try {
        await saveQuizScore(name, score);
        res.status(200).json({ message: '점수가 성공적으로 저장되었습니다.' });
    } catch (error) {
        console.error("서버 에러 발생", error);
        res.status(500).json({ message: '서버 에러 발생' });
    }
});

module.exports = router;
