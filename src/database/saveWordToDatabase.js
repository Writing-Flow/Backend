const { pool } = require('./index');

async function saveWordToDatabase(wordDataArray) {
    try {
        for (const wordData of wordDataArray) {
            const word = wordData.word;
            for (const sense of wordData.sense) {
                const {
                    syntacticArgument = '',
                    syntacticAnnotation = '',
                    cat = '',
                    definition = '',
                    origin = '',
                    sense_no = '',
                    target_code = '',
                    pos = ''
                } = sense;

                // 중복 검사: target_code를 기준으로 중복 여부 확인
                const rows = await pool.query('SELECT * FROM randomwords WHERE target_code = ?', [target_code]);
                if (rows.length > 0) {
                    console.log(`Word already exists with the same target_code: ${target_code}`);
                    return { saved: false, message: 'Word already exists with the same target_code', id: rows[0].id, data: rows[0] };
                }

                await pool.query(
                    'INSERT INTO randomwords (word, syntactic_argument, syntactic_annotation, category, definition, origin, sense_no, target_code, pos, full_json) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [word, syntacticArgument, syntacticAnnotation, cat, definition, origin, sense_no, target_code, pos, JSON.stringify(wordData)]
                );
            }
        }

        console.log(`Saved Word`);
        return { saved: true, message: 'Word saved successfully', data: wordDataArray };

    } catch (error) {
        console.error(`Error saving word to DB: ${error}`);
        return { saved: false, message: 'Error saving word to DB', data: null };
    }
}

module.exports = saveWordToDatabase;
