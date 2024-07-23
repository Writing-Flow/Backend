const { pool } = require('../../database/index');

async function getTodayWords() {
    try {
        const today = new Date().toISOString().slice(0, 10); // 오늘 날짜를 YYYY-MM-DD 형식으로 가져옴
        const query = `
            SELECT word, definition
            FROM randomwords
            WHERE DATE(created_at) = ?
            ORDER BY RAND()
            LIMIT 10
        `;
        const results = await pool.query(query, [today]);
        console.log('쿼리 결과:', results); // 쿼리 결과 로그

        return results;
    } catch (error) {
        console.error('쿼리 실행 오류:', error);
        throw error;
    }
}

module.exports = getTodayWords;
