const User = require("../models/User");

exports.getProfileByUsername = async (req, res) => {
    try {
        const username = req.params.username;
        console.log(username);
        const user = await User.findOne({ username: username });
        console.log(user);
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

exports.CreateUser = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        const user = new User({
            email,
            password,
            username,
        });
        console.log(user)
        await user.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}