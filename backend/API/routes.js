const express = require('express');
const userController = require("./controllers/UserController");
const userAuth = require("./middlewares/userAuth");
const fileController = require("./controllers/FileController");
const multer = require('multer');
const upload = multer();
const folderController = require("./controllers/FolderController");
const driveController = require("./controllers/DriveController");
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
router.get('/profile', userAuth ,userController.getProfileByUsername);
router.post('/login', userController.loginUser);
router.post('/create-user', userController.createUser);
router.get('/login', userController.loginUser);
router.post('/create-user', userController.createUser);

// Folder Routes
router.post('/create-folder', userAuth, folderController.createFolder);
router.delete('/delete-folder/:folderId', userAuth, folderController.deleteFolder);

// File Routes
router.post('/upload', userAuth, upload.single('file'), fileController.uploadFile);
router.get('/download/:fileId', userAuth, fileController.downloadFile);
router.get('/details/:fileId', userAuth, fileController.getFileDetails);
router.put('/update/:fileId', userAuth, fileController.updateFileDetails);
router.delete('/delete-files/:fileId', userAuth, fileController.deleteFile);

//Dashboard Routes
router.get('/dashboard/:folderId', userAuth, driveController.getFolderStuff);
router.get('/dashboard', userAuth, driveController.getRootStuff);


module.exports = router;