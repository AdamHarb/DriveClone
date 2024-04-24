const express = require('express');
const userController = require("./controllers/UserController");

const router = express.Router();

router.get('/', (req, res) => {
			res.send('Hello World!');
});

router.get('/profile/:username', userController.getProfileByUsername);
router.post('/createUser', userController.CreateUser);
module.exports = router;