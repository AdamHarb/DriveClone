const express = require('express');
const userController = require("./controllers/UserController");
const folderController = require("./controllers/FolderController");

const router = express.Router();

router.get('/', (req, res) => {
			res.send('Hello World!');
});
//Add to this route the get files without folders api as well.
router.get('/homepage', folderController.getFoldersByUserId);
router.post('/createFolder', folderController.createFolder);

router.get('/profile/:username', userController.getProfileByUsername);

router.post('/createUser', userController.CreateUser);
module.exports = router;