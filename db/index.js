const pgp = require("pg-promise")();
const connection = pgp(process.env.DATABASE_URL);

// self-signed certificate connection
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

module.exports = connection;
