const logger = require('../helpers/logger');
const knex = require('knex');

const defaultConnectionString = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.pmsysdb,
  debug: ['ComQueryPacket', 'RowDataPacket'],
};

/**
 * @type {Knex}
 */
const dbConnect = knex({
  client: 'mysql',
  connection: defaultConnectionString,
  debug: ['ComQueryPacket', 'RowDataPacket'],
  log: {
    warn(message) {
      logger.warn(message);
    },
    error(message) {
      logger.error(message);
    },
    debug(message) {
      logger.info(message);
    },
  },
});

// const mysql = require('mysql');
// const dbConnect = (params = { ...defaultConnectionString }) => {
//   const mysqlConnection = mysql.createConnection(params);

//   mysqlConnection.connect((error) => {
//     if (error) {
//       logger.error('Database connection error');
//       throw error;
//     }

//     logger.info('Database connected successfully');
//   });

//   return mysqlConnection;
// };

// const configs = require('../configs/configs');

// const mongoose = require('mongoose');
//MongoDB
// const dbConnect = (dbName = '') => {
//   const url = configs.isProduction
//     ? configs.dbUrl.online + dbName
//     : configs.dbUrl.offline + dbName;

//   if (mongoose.connection.readyState == 0) {
//     mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
//     mongoose.set('useCreateIndex', true);
//     logger.info(`Database connecting at url: ${url}`);
//   }

//   const dbConnection = mongoose.connection;

//   dbConnection.on('error', () => {
//     logger.error('Database connection error');
//   });
//   dbConnection.once('open', () => {
//     logger.info('Database connected successfully');
//   });

//   return dbConnection;
// };

module.exports = dbConnect;
