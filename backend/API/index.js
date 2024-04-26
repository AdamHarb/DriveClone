const express = require('express');
const router = require('./routes');
var cors = require('cors')
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors());

app.use(cookieParser());

app.use(express.json());

app.use("/api", router);

module.exports = app;