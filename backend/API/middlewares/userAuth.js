const jwt = require('jsonwebtoken');
const User = require('../models/User');

require('dotenv').config();

const userAuth = async (req, res, next) => {
	const token = req.cookies?.token;

	if (!token) {
		return res.status(401).json({ error: 'No token provided' });
	}

	try {
		const data = jwt.verify(token, process.env.JWT_SECRET_KEY);

		const user = await User.findOne({ _id: data.id });

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		req.user = user;

		next();
	} catch (err) {
		return res.status(401).json({ error: 'Invalid token' });
	}
};

module.exports = userAuth;