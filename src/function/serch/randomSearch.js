const fetchRandomKoreanWord = require('../../randomword');
const searchWord = require('./searchWord');
const saveWordToDatabase = require('../../database/saveWordToDatabase');

async function performRandomSearchAndSave() {
    try {
        const word = await fetchRandomKoreanWord();
        if (!word) {
            console.log("단어를 가져오지 못했습니다.");
            return;
        }
        console.log(`랜덤 단어: ${word}`);

        const searchResult = await searchWord(word);

        if (!searchResult.found) {
            console.log(searchResult.message);
            return;
        }

        // 가장 첫 번째 뜻만 저장
        const firstMeaningData = searchResult.data.length > 0 ? [searchResult.data[0]] : [];
        const saveResult = await saveWordToDatabase(firstMeaningData);

        if (!saveResult.saved) {
            console.log(saveResult.message);
            return;
        }

        console.log("단어 정보를 성공적으로 저장했습니다.", saveResult.data);
    } catch (error) {
        console.error("서버 에러 발생", error);
    }
}

module.exports = performRandomSearchAndSave;
