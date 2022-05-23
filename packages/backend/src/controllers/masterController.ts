import { Response } from "express";
import { knexMySQL } from "services/database";
import { logger } from "utilities/logger";
import { handleServerResponse, handleServerError } from "helpers/serverResponse";
import { DeliverablesMaster } from "@wakra-project/common";
import { RequestWithMetrics } from "types";
import { generateAccessToken } from "middlewares/authToken";

export const addDeliverables = async (req: RequestWithMetrics, res: Response): Promise<void> => {
	try {
		logger.info("@loginControllers");

		console.log("@addDeliverables req data", req.body);

		// // const results = await knexMySQL.raw(
		// // 	`
		// // 	SELECT
		// // 		Usr_Id,
		// // 		Usr_Name,
		// // 		Usr_Email,
		// // 		Usr_Ph,
		// // 		IsAdmin,
		// // 		IsActive,
		// // 		IsAdd,
		// // 		IsEdit,
		// // 		IsCancel,
		// // 		IsDelete
		// // 	FROM
		// // 		userm
		// // 	WHERE
		// // 		Usr_Id=0 AND Usr_pwd=0;`,
		// // 	[]
		// // );

		// // if (!results[0].length) throw new Error("No user found");
		// // if (results.length && results[0][0].IsActive < 1) throw new Error("User not active.");

		// const returnUser = { ...results[0][0] };
		// const returnToken = generateAccessToken(returnUser);

		handleServerResponse(res, req, 200, {
			__typename: "sample",
			success: true,
			message: "Login success",
			data: req.body,
		});
	} catch (error) {
		logger.error(`@loginControllers Error ${error}`);
		handleServerError(res, req, 500, {
			success: false,
			message: "Login error",
			errorMessage: (error as Error).message,
		});
	}
};
