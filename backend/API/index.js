const express = require('express');
const router = require('./routes');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());

app.use(express.json());

app.use("/api", router);

module.exports = app;