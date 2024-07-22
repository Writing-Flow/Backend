const axios = require('axios');
require('dotenv').config();

async function searchWord(word) {
    const url = 'https://opendict.korean.go.kr/api/search';

    try {
        const response = await axios.get(url, {
            params: {
                key: process.env.API_KEY,
                q: word,
                req_type: 'json',
                part: 'word',
                target: '1,9,10,5,6',
                type1: 'word',
                type2: 'all',
                type3: 'general',
                type4: 'general',
                pos: 1,
                lang: 0
            }
        });

        if (!response.data.channel || !response.data.channel.item || response.data.channel.item.length === 0) {
            console.error(`No information found for word: ${word}`);
            return { found: false, message: 'No information found for word', data: null };
        }

        const wordDataArray = response.data.channel.item; // 모든 결과 사용
        return { found: true, message: 'Words found', data: wordDataArray };

    } catch (error) {
        console.error(`Error fetching data for word "${word}":`, error);
        return { found: false, message: 'Error fetching data', data: null };
    }
}

module.exports = searchWord;
