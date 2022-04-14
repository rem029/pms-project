import express, { Express } from "express";
import cors from "cors";
import responseTime from "response-time";
import { StatsD } from "node-statsd";

import { loginRoute } from "routes/loginRoutes";
import { userRoutes } from "routes/userRoutes";
import { reportRoutes } from "routes/reportRoutes";
import { logger } from "utilities/logger";

const initializeAppExpress = (): Express => {
	const app = express();
	const stats = new StatsD();

	const corsOptions = {
		origin: "*",
		optionsSuccessStatus: 200,
	};

	app.use(express.urlencoded({ extended: true }));
	app.use(express.json());
	app.use(cors(corsOptions));

	app.use("/login", loginRoute);
	app.use("/user", userRoutes);
	app.use("/report", reportRoutes);

	app.use(
		responseTime((req, _, time) => {
			const stat = (req?.method || "" + req?.url || "").toLowerCase().replace(/[:.]/g, "").replace(/\//g, "_");
			stats.timing(stat, time);

			logger.info(`${req.method} ${req.url} ${time}ms`);
		})
	);

	//Default routes
	app.get("/test", async (_, res) => {
		res.send("<h1>Its online!!!</h1>");
	});

	app.get("/favicon.ico", async (_, res) => {
		res.redirect("/");
	});

	return app;
};

export const app = initializeAppExpress();
