// ======================================
// IMPORT REQUIRED PACKAGES
// ======================================

const mysql = require("mysql2");
require("dotenv").config();

// ======================================
// CREATE MYSQL CONNECTION
// ======================================

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

// ======================================
// CONNECT TO DATABASE
// ======================================

db.connect((err) => {

    if (err) {
        console.error("❌ Failed to connect to MySQL");
        console.error(err.message);
        return;
    }

    console.log("✅ Connected to MySQL Database");

});

// ======================================
// EXPORT DATABASE CONNECTION
// ======================================

module.exports = db;
