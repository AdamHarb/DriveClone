const User = require("../models/User");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const getProfileByUsername = async (req, res) => {
    try {
        const username = req.user.username;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const profileInfo = {
            email: user.email,
            username :user.username,
            avatar: user.avatar,
            storage_used: user.storage_used
        };

        res.status(200).json(profileInfo);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getCurrentUser = async (req, res) => {
    res.status(200).json({user: req.user});
}

const createUser = async (req, res) => {
    try {
        const { email, password, username } = req.body;

        if (!email || !password || !username) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }

        const user = new User({
            email,
            password,
            username,
        });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(201).json({ message: "User created successfully",success:true, token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error",success:false });
    }
}

module.exports = {
    loginUser,
    getProfileByUsername,
    createUser,
    getCurrentUser
};