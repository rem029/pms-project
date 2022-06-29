import express, { Express } from "express";
import cors from "cors";

import { loginRoute } from "routes/loginRoutes";
import { userRoutes } from "routes/userRoutes";
import { reportRoutes } from "routes/reportRoutes";
import { masterRoutes } from "routes/masterRoutes";
import { projectRoutes } from "../routes/projectRoutes";
import { RequestWithMetrics } from "types";

const initializeAppExpress = (): Express => {
	const app = express();

	const corsOptions = {
		origin: "*",
		optionsSuccessStatus: 200,
	};

	app.use(express.urlencoded({ extended: true }));
	app.use(express.json());
	app.use(cors(corsOptions));

	app.all("*", (req: RequestWithMetrics, _, next) => {
		req.startTime = new Date(new Date().getTime());
		next();
	});

	app.use("/login", loginRoute);
	app.use("/user", userRoutes);
	app.use("/report", reportRoutes);
	app.use("/master", masterRoutes);
	app.use("/project", projectRoutes);

	//Default routes
	app.get("/test", async (_, res) => {
		res.json({ status: "running" });
	});

	app.get("/favicon.ico", async (_, res) => {
		res.redirect("/");
	});

	return app;
};

export const app = initializeAppExpress();
