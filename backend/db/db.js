const mongoose = require('mongoose');
const client = require('mongodb').MongoClient;
const { GridFSBucket } = require('mongodb');
require('dotenv').config();
let gfsBucket;

async function connectDB() {
    try {
        await mongoose.connect(process.env.ATLAS_URI);
        console.log("Connected to MongoDB Atlas via Mongoose");
        const db = await getDB();
        gfsBucket = new GridFSBucket(db);
    } catch (error) {
        console.error("Error connecting to MongoDB Atlas: ", error);
        process.exit(1);
    }
}

function getGridFSBucket() {
    return new Promise((resolve, reject) => {
        if (gfsBucket) {
            resolve(gfsBucket);
        } else {
            connectDB()
                .then(() => {
                    resolve(gfsBucket);
                })
                .catch((error) => {
                    reject(error);
                });
        }
    });
}

async function getDB() {
    return await client.connect(process.env.ATLAS_URI).then((client) => client.db());
}

function getAutoInc() {
    return require('mongoose-sequence')(mongoose);
}

module.exports = {
    connectDB,
    getGridFSBucket,
    getDB,
    getAutoInc
};