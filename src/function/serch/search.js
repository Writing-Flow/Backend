const express = require('express');
const searchWord = require('./searchWord');

const router = express.Router();

router.get('/', async (req, res) => {
    const word = req.query.word;
    if (!word) {
        return res.status(400).json({ message: "검색어를 입력해주세요." });
    }

    try {
        const searchResult = await searchWord(word);

        if (!searchResult.found) {
            return res.status(404).json({ message: searchResult.message });
        }

        res.status(200).json({ message: "단어 정보를 성공적으로 가져왔습니다.", data: searchResult.data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "서버 에러 발생" });
    }
});

module.exports = router;
