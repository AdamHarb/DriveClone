const express = require('express');
const userController = require("./controllers/UserController");
const userAuth = require("./middlewares/userAuth");

const router = express.Router();

router.get('/', (req, res) => {
			res.send('Hello World!');
});

router.get('/profile/:username', userController.getProfileByUsername);

router.post('/login', userController.loginUser);

router.post('/create-user', userController.createUser);

router.post('/test-middleware', userAuth, (req, res) => {
			res.json({
				message: `You have been authorized, ${req.user.username}!`
			})
});

module.exports = router;