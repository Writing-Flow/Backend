const express = require('express');
const fetchRandomKoreanWord = require('../../randomword');
const searchWord = require('./searchWord');
const saveWordToDatabase = require('../../database/saveWordToDatabase');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const word = await fetchRandomKoreanWord();
        if (!word) {
            res.status(500).json({ message: "단어를 가져오지 못했습니다." });
            return;
        }
        console.log(`랜덤 단어: ${word}`);

        const searchResult = await searchWord(word);

        if (!searchResult.found) {
            res.status(500).json({ message: searchResult.message });
            return;
        }

        // 가장 첫 번째 뜻만 저장
        const firstMeaningData = searchResult.data.length > 0 ? [searchResult.data[0]] : [];
        const saveResult = await saveWordToDatabase(firstMeaningData);

        if (!saveResult.saved) {
            res.status(500).json({ message: saveResult.message });
            return;
        }

        res.status(200).json({ message: "단어 정보를 성공적으로 저장했습니다.", data: saveResult.data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "서버 에러 발생" });
    }
});

module.exports = router;
