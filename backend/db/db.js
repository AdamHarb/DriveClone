const { MongoClient } = require('mongodb')
require('dotenv').config();



async function main() {
    const uri = process.env.ATLAS_URI;
    const client = new MongoClient(uri)
    await client.connect()
}
main()

