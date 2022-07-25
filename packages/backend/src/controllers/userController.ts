import { knexMySQL } from "services/database";
import { UserInfo } from "@pms-project/common";

export const getUserInfoController = async (body: { userId: string }): Promise<UserInfo> => {
	const { userId } = body;

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
				Usr_Id=?;`,
		[userId]
	);

	if (!results[0].length) throw new Error("No user found");
	if (results.length && results[0][0].IsActive < 1) throw new Error("User not active.");

	const response = { ...results[0][0] } as UserInfo;
	return response;
};
