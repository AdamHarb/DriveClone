const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');
require('dotenv').config();

let db;
let gfsBucket;

async function connectDB() {
    try {
        await mongoose.connect(
            process.env.ATLAS_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log("Connected to MongoDB Atlas via Mongoose");
        db = mongoose.connection.db;
        gfsBucket = new GridFSBucket(db);
    } catch (error) {
        console.error("Error connecting to MongoDB Atlas: ", error);
        process.exit(1);
    }
}

function getGridFSBucket() {
    if (!gfsBucket) {
        throw new Error("GridFS bucket not initialized");
    }
    return gfsBucket;
}

module.exports = {
    connectDB,
    getGridFSBucket,
};