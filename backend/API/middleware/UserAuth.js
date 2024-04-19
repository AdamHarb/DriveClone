const jwt = require('jsonwebtoken');



const userAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const data = jwt.verify(token, config.JWT_SECRET_KEY);

        const user = await db
            .selectFrom('user')
            .selectAll()
            .where('id', '=', data.id)
            .executeTakeFirst();

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        req.user = user;

        console.log(user);
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = userAuth;