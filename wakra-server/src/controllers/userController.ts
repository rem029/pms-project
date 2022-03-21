import { Response } from 'express';
import { knexMySQL } from 'services/database';
import { logger } from 'utilities/logger';
import { handleResponse, handleError } from 'helpers/serverResponse';
import { RequestAuthInterface, UserInfo } from 'types';

export const getUserInfoController = async (req: RequestAuthInterface, res: Response) => {
  try {
    logger.info(`@getUserInfoController`);

    const { userId } = req.user ? req.user : { userId: '' };

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

    if (!results[0].length) throw new Error('No user found');
    if (results.length && results[0][0].IsActive < 1) throw new Error('User not active.');

    const returnUser = { ...results[0][0] } as UserInfo;

    handleResponse(res, 200, {
      success: true,
      message: 'Get user info success',
      data: returnUser,
    });
  } catch (error: any) {
    logger.error(`@getUserInfoController Error ${error}`);

    handleError(res, 500, {
      success: false,
      message: `Get user info error: ${error.message}`,
      error: error,
    });
  }
};
