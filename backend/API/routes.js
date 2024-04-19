const express = require('express');
const UserAuth = require('./middleware/UserAuth');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.get('/test', UserAuth, (req, res) => {
    res.send('Success!');
});

module.exports = router;