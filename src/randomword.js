const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://randomoutputs.com/random-korean-word-generator?quantity=1';

async function fetchRandomKoreanWord() {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const wordElement = $('span.display-block.bold.fs-40px.mb-2[data-query]');
        let word = wordElement.attr('data-query');
        if (word) {
            word = word.replace(' Language', ''); // 'Language' 제거
        }
        return word;
    } catch (error) {
        console.error('Error fetching random Korean word:', error);
        return null;
    }
}



module.exports = fetchRandomKoreanWord;
