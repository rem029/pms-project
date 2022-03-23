import dotEnv from "dotenv";
dotEnv.config();

import { httpServer } from "services/server";
import { Server as IOServer } from "socket.io";
import { configs } from "configs";
import {logger} from "utilities/logger";

const port = configs.port;
const io = new IOServer(httpServer, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});

io.on("connection", (client) => {
	logger.info("SOCKETIO: A client connected");

	client.on("disconnect", () => {
		logger.info("SOCKETIO: A client got disconnected");
	});
});

httpServer.listen(port, () => {
	logger.info("Server running on port:" + port);
	logger.info("Server running in mode: " + process.env.NODE_ENV);
});
