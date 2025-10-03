const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
    host: 'shuttle.proxy.rlwy.net',               // your remote MySQL host
    user: 'root',                                 // your MySQL username
    password: 'zoSbaTlAfxoKUTGZoCcQnfPJwPZYEwHT',// your MySQL password
    database: 'feedback_system_db',              // your database name
    port: 17067,                                  // your MySQL port
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});

module.exports = pool.promise();
