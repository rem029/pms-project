import { knexMySQL } from "services/database";
import { logger } from "utilities/logger";
import { Token, UserInfo } from "@wakra-project/common";
import { generateAccessToken } from "middlewares/authToken";

export const loginController = async (body: { userId: string; password?: string | undefined }): Promise<Token> => {
	logger.info("@loginControllers");
	const { userId, password } = body;

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
	return returnToken;
};
