const { Pool } = require('pg');
const { readFileSync } = require('fs');
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

const users = readFileSync('./data/users.sql').toString();
const ngos = readFileSync('./data/ngos.sql').toString();

async function seed() {
    const client = await pool.connect();

    let result;

    try {
        await client.query("BEGIN");

        await client.query('TRUNCATE TABLE user_informations RESTART IDENTITY CASCADE');
        await client.query('TRUNCATE TABLE ngo RESTART IDENTITY CASCADE');

        await client.query(users);
        await client.query(ngos);

        await client.query('UPDATE ngo SET service[1] = $1, zone = $2 WHERE id = $3', ["Legal Aid", "North", 1]);

        await client.query("COMMIT");

        result = "ok";
    } catch (error) {
        await client.query('ROLLBACK');
        result = "error";
    } finally {
        client.release();
        return result;
    }
}

module.exports.seed = seed;