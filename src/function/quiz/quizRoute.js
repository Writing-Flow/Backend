const express = require('express');
const getTodayWords = require('./getTodayWords');

const router = express.Router();

router.get('/', async (req, res) => {
    console.log("퀴즈 요청 수신");
    try {
        const words = await getTodayWords();
        console.log("쿼리 결과:", words);

        if (!Array.isArray(words) || words.length === 0) {
            return res.status(404).json({ message: '오늘 등록된 단어가 없습니다.' });
        }

        // 단어와 정의를 섞어서 문제를 만듭니다.
        const questions = words.map((word) => {
            return {
                word: word.word,
                definition: word.definition
            };
        });

        console.log("단어 가져오기 성공");
        res.status(200).json({ questions });
    } catch (error) {
        console.error("서버 에러 발생", error);
        res.status(500).json({ message: '서버 에러 발생' });
    }
});

module.exports = router;
