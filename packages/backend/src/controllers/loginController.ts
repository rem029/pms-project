import { Response } from "express";
import { knexMySQL } from "services/database";
import { logger } from "utilities/logger";
import { handleServerResponse, handleServerError } from "helpers/serverResponse";
import { UserInfo } from "@wakra-project/common";
import { RequestAuthInterface } from "types";
import { generateAccessToken } from "middlewares/authToken";

export const loginController = async (req: RequestAuthInterface, res: Response): Promise<void> => {
	try {
		logger.info("@loginControllers");
		const { userId, password } = req.user ? req.user : { userId: "", password: "" };

		const results = await knexMySQL.raw(
			`
			SELECT 
				Usr_Id,
				Usr_Name,
				Usr_Email,
				Usr_Ph,
				IsAdmin,
				IsActive,
				IsAdd,
				IsEdit,
				IsCancel,
				IsDelete
			FROM 
				userm
			WHERE
				Usr_Id=? AND Usr_pwd=?;`,
			[userId, password ? password : ""]
		);

		if (!results[0].length) throw new Error("No user found");
		if (results.length && results[0][0].IsActive < 1) throw new Error("User not active.");

		const returnUser = { ...results[0][0] } as UserInfo;
		const returnToken = generateAccessToken(returnUser);

		handleServerResponse(res, 200, {
			__typename: returnToken.__typename,
			success: true,
			message: "Login success",
			data: returnToken,
		});
	} catch (error) {
		logger.error(`@loginControllers Error ${error}`);
		handleServerError(res, 500, {
			success: false,
			message: "Login error",
			error: error as Error,
		});
	}
};
