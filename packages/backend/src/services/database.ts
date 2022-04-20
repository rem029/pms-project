import { logger } from "utilities/logger";
import knex from "knex";

const defaultConnectionString = {
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PW,
	database: process.env.DB_DB,
	debug: ["ComQueryPacket", "RowDataPacket"],
};

export const knexMySQL = knex({
	client: "mysql",
	connection: { ...defaultConnectionString, timezone: "utc" },
	debug: true,
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

	pool: {
		min: 2,
		max: 6,
		createTimeoutMillis: 3000,
		acquireTimeoutMillis: 30000,
		idleTimeoutMillis: 30000,
		reapIntervalMillis: 1000,
		createRetryIntervalMillis: 100,
		propagateCreateError: false, // <- default is true, set to false
	},
});
