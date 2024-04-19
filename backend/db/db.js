const { MongoClient } = require('mongodb')
require('dotenv').config();

async function main() {
    const uri = process.env.ATLAS_URI;
    const client = new MongoClient(uri)
    try {
        await client.connect()
        console.log("Connected to the database");
    } catch (e) {
        console.log("Error: ", e);
    }
}

module.exports = { main };