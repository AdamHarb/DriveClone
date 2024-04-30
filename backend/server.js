const app = require('./API/index');
require('dotenv').config();
const multer = require("multer");
const {connectDB} = require("./db/db");

const storage = multer.memoryStorage();
multer({ storage: storage });

connectDB().catch(console.error).then(() => {
	app.listen(process.env.PORT, () => {
		console.log(`API is running on ${process.env.BACKEND_URL}:${process.env.PORT}/api`);
	});
});
