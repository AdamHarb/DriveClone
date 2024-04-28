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
router.get('/profile', userAuth ,userController.getProfileByUsername);
router.post('/login', userController.loginUser);
router.post('/create-user', userController.createUser);
router.get('/login', userController.loginUser);
router.post('/create-user', userController.createUser);

// Folder Routes
router.get('/list-folders', userAuth, async function (req, res) {
		const folders = await folderController.getFoldersByUserId(req, res);
		res.status(folders.status).json(folders.data);
});
router.post('/create-folder', userAuth, folderController.createFolder);

// File Routes
router.post('/upload', userAuth, upload.single('file'), fileController.uploadFile);
router.get('/download/:fileId', userAuth, fileController.downloadFile);
router.get('/details/:fileId', userAuth, fileController.getFileDetails);
router.put('/update/:fileId', userAuth, fileController.updateFileDetails);
router.delete('/delete/:fileId', userAuth, fileController.deleteFile);
router.get('/list-files', userAuth, async function (req, res) {
		const files = await fileController.listFiles(req, res);
		res.status(files.status).json(files.data);
});

//Dashboard Routes
router.get('/dashboard', userAuth, async function (req, res) {
	try {
		const [userFolders, userFiles] = await Promise.all([
			folderController.getRootFoldersByUserId(req,res),
			fileController.listRootFiles(req,res)
		]);
		if(userFolders.status !== 200 || userFiles.status !== 200){
			res.status(500).json({ message: "Internal server error" });
		}
		res.status(200).json({
			userFolders: userFolders.data,
			userFiles: userFiles.data
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Internal server error" });
	}
});


module.exports = router;