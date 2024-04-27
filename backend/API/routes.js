const express = require('express');
const userController = require("./controllers/UserController");
const userAuth = require("./middlewares/userAuth");
const fileController = require("./controllers/FileController");
const multer = require('multer');
const upload = multer();
const folderController = require("./controllers/FolderController");

const router = express.Router();

// Base Routes
router.get('/', (req, res) => {
			res.send('Hello World!');
});
router.post('/test-middleware', userAuth, (req, res) => {
			res.json({
				message: `You have been authorized, ${req.user.username}!`
			})
});

// User Routes
router.get('/profile/:username', userController.getProfileByUsername);
router.post('/login', userController.loginUser);
router.post('/create-user', userController.createUser);

// Folder Routes
router.get('/homepage', userAuth, folderController.getFoldersByUserId);
router.post('/create-folder', userAuth, folderController.createFolder);
router.get('/profile', userAuth ,userController.getProfileByUsername);
router.get('/login', userController.loginUser);
router.post('/create-user', userController.createUser);

// File Routes
router.post('/upload', userAuth, upload.single('file'), fileController.uploadFile);
router.get('/download/:fileId', userAuth, fileController.downloadFile);
router.get('/details/:fileId', userAuth, fileController.getFileDetails);
router.put('/update/:fileId', userAuth, fileController.updateFileDetails);
router.delete('/delete/:fileId', userAuth, fileController.deleteFile);
router.get('/list', userAuth, fileController.listFiles);

module.exports = router;