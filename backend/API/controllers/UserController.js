const User = require("../models/User");

exports.getProfileByUsername = async (req, res) => {
    try {
        const username = req.params.username;

        const user = await User.findOne({ username: username });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const profileInfo = {
            email: user.email,
            username :user.username,
            avatar: user.avatar,
        };

        res.status(200).json(profileInfo);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};