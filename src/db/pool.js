const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const dbConfig = {
    connectionString: process.env.DATABASE_URL,
    connectionTimeoutMillis: 300000,
    idleTimeoutMillis: 300000,
    max: 20,
}

const pool = new Pool(dbConfig);

pool.on('connect', () => {
    console.log("database is connected");
})


pool.on('remove', () => {
    console.log("database connection removed");
})

module.exports = pool;