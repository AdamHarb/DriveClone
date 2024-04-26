const express = require('express');
const userController = require("./controllers/UserController");
const userAuth = require("./middlewares/userAuth");
const fileController = require("./controllers/FileController");
const multer = require('multer');
const upload = multer();

const router = express.Router();

router.get('/', (req, res) => {
			res.send('Hello World!');
});

router.get('/profile/:username', userController.getProfileByUsername);

router.get('/login', userController.loginUser);

router.post('/create-user', userController.createUser);

router.post('/test-middleware', userAuth, (req, res) => {
			res.json({
				message: `You have been authorized, ${req.user.username}!`
			})
});

router.post('/upload', userAuth, upload.single('file'), fileController.uploadFile);

router.get('/download/:fileId', userAuth, fileController.downloadFile);

router.get('/details/:fileId', userAuth, fileController.getFileDetails);

router.put('/update/:fileId', userAuth, fileController.updateFileDetails);

router.delete('/delete/:fileId', userAuth, fileController.deleteFile);

router.get('/list', userAuth, fileController.listFiles);

module.exports = router;