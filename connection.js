// Do not change this file
require('dotenv').config();
const { MongoClient } = require('mongodb');

async function main(callback) {
    const URI = process.env.CONNECTIONSTRING; // Declare  in your .env file
    const client = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        await callback(client);

    } catch (e) {
        // Catch any errors
        console.error(e);
        throw new Error('Unable to Connect to Database')
    }
}

module.exports = main;