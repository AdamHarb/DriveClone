const express = require('express');
const userController = require("./controllers/UserController");
const userAuth = require("./middlewares/userAuth");
const folderController = require("./controllers/FolderController");

const router = express.Router();

router.get('/', (req, res) => {
			res.send('Hello World!');
});
//Add to this route the get files without folders api as well.
router.get('/homepage', userAuth, folderController.getFoldersByUserId);
router.post('/create-folder', userAuth, folderController.createFolder);

router.get('/profile', userAuth ,userController.getProfileByUsername);

router.get('/login', userController.loginUser);

router.post('/create-user', userController.createUser);

router.post('/test-middleware', userAuth, (req, res) => {
			res.json({
				message: `You have been authorized, ${req.user.username}!`
			})
});

module.exports = router;