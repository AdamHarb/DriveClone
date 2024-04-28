const app = require('./API/index');
require('dotenv').config();
const multer = require("multer");
const {connectDB} = require("./db/db");

const storage = multer.memoryStorage();
multer({ storage: storage });

connectDB().catch(console.error).then(() => {
	app.listen(3000, () => {
		console.log('Server is running on http://localhost:3000');
		console.log('API is running on http://localhost:3000/api/');
	});
});
