const dotenv = require("dotenv");
dotenv.config();
const config = {
  db: {
    /* don't expose password or any sensitive info, done only for demo */
    host: process.env.LOCAL_DB_HOST,
    user: process.env.LOCAL_DB_USER,
    password: process.env.LOCAL_DB_PASSWORD,
    database: process.env.LOCAL_DB_NAME,
    port: process.env.LOCAL_DB_PORT,
  },
  listPerPage: 10,
};
module.exports = config;
