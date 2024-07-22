require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const router = require('./src/router');
const bodyParser = require('body-parser');

app.use('/', router);

app.listen(port, () => {
    console.log(`web server start... ${port}`);
});