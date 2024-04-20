const mongoose = require('mongoose');
require('dotenv').config();

async function main() {
    try {
        await mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB Atlas via Mongoose");
    } catch (error) {
        console.error("Error connecting to MongoDB Atlas: ", error);
    }
}

module.exports = main;