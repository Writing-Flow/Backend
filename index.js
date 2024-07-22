const express = require('express');
require('dotenv').config();

const app = express();
const router = require('./src/router');

// 서버 설정
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
