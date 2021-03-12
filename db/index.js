const pgp = require("pg-promise")();
// self-signed certificate connection
const connection = pgp((process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0));

module.exports = connection;
