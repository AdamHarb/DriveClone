const app = require('./API/index');
require('dotenv').config();
const main = require('./db/db.js');

main().catch(console.error).then(() => {
	app.listen(3000, () => {
		console.log('Server is running on http://localhost:3000');
		console.log('API is running on http://localhost:3000/api/');
	});
});
