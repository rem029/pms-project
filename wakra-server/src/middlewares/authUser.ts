import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { logger } from 'utilities/logger';
import { RequestAuthInterface } from 'types';
import { handleResponse, handleError } from 'helpers/serverResponse';

const verifyBodyCreateUser = (reqBody: any): { isAccepted: boolean; message: string } => {
  const hasEmail = reqBody.email && reqBody.email;
  const hasPassword = reqBody.password && reqBody.password;

  return hasEmail && hasPassword
    ? { isAccepted: true, message: '' }
    : { isAccepted: false, message: 'Invalid body' };
};

const passwordEncrypt = (password: string) => bcrypt.hash(password, 10);

export const passwordCompare = (password: string, passwordHashed: string) =>
  bcrypt.compare(password, passwordHashed);

export const authenticateLogin = async (
  req: RequestAuthInterface,
  res: Response,
  next: NextFunction
) => {
  const userFromHeader = req.headers['authorization'] ? req.headers['authorization'] : '';
  const user =
    req.headers['authorization'] && userFromHeader.split(' ')[1]
      ? req.headers['authorization'] && userFromHeader.split(' ')[1]
      : '';

  if (!user)
    return handleError(res, 400, {
      success: false,
      message: 'Credentials are required',
    });

  const userDecoded = Buffer.from(user, 'base64').toString().split(':');
  const userId = userDecoded[0];
  const password = userDecoded[1];

  logger.info(`@middleware authenticateLogin. userId: ${userId}`);
  req.user = { userId: userId, password: password };
  next();
};

export const authenticateCreateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info(`@middleware authenticateCreateUser ${JSON.stringify(req.body)}`);
  const verifyBodyCreateUserResponse = verifyBodyCreateUser(req.body);

  if (!verifyBodyCreateUserResponse.isAccepted)
    return handleError(res, 400, {
      success: false,
      message: verifyBodyCreateUserResponse.message,
    });

  req.body.password = await passwordEncrypt(req.body.password);
  next();
};
