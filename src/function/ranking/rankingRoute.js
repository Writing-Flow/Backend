const express = require('express');
const getTopScores = require('./getTopScores');

const router = express.Router();

router.get('/', async (req, res) => {
    console.log("랭킹 요청 수신");
    try {
        const scores = await getTopScores();
        console.log("쿼리 결과:", scores);

        if (!Array.isArray(scores) || scores.length === 0) {
            return res.status(404).json({ message: '오늘 등록된 점수가 없습니다.' });
        }

        console.log("점수 가져오기 성공");
        res.status(200).json({ scores });
    } catch (error) {
        console.error("서버 에러 발생", error);
        res.status(500).json({ message: '서버 에러 발생' });
    }
});

module.exports = router;
