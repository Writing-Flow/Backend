const { pool } = require('../../database/index');

async function saveQuizScore(name, score) {
    try {
        const query = 'INSERT INTO quiz_scores (name, score) VALUES (?, ?)';
        const results = await pool.query(query, [name, score]);
        return results;
    } catch (error) {
        console.error('점수 저장 오류:', error);
        throw error;
    }
}

module.exports = saveQuizScore;
