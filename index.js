const express = require('express');
require('dotenv').config();
const cron = require('node-cron');
const performRandomSearchAndSave = require('./src/function/serch/randomSearch');
const router = require('./src/router');

const app = express();

// 서버 설정
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// 자정에 120회 작업을 수행하는 크론 작업 설정
cron.schedule('0 0 * * *', async () => {
    console.log("자정에 작업 시작");
    for (let i = 0; i < 120; i++) {
        await performRandomSearchAndSave();
    }
    console.log("자정에 작업 완료");
}, {
    timezone: "Asia/Seoul" // 서버의 시간대를 서울 시간으로 설정
});
