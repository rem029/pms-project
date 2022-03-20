const logger = require('../helpers/logger');
const dbConnect = require('../services/database');

const sample = {
  Usr_Id: 'law',
  Usr_Name: 'Lawarance',
  Usr_Email: 'n/a@gmail.com',
  Usr_Ph: '616465646',
  IsAdmin: 0, //if full access
  IsActive: 0, //If account is activated
  Usr_pwd: '123',
  IsAdd: 0, //can create new entries
  IsEdit: 0,
  IsCancel: 0,
  IsDelete: 0,
};

const responseStatus = { success: false, message: '', data: null, error: null };

const login = async (req = new Request(), res = Response) => {
  try {
    logger.info(`@login`);
    const userFromHeader = req.headers['authorization'];
    const user = req.headers['authorization'] && userFromHeader.split(' ')[1];
    const userDecoded = Buffer.from(user, 'base64').toString().split(':');
    const userId = userDecoded[0];
    const password = userDecoded[1];

    const results = await dbConnect.raw(
      `
    SELECT 
        * 
    FROM 
        userm
    WHERE
        Usr_Id=? AND Usr_pwd=?;`,
      [userId, password]
    );

    if (!results[0].length) throw new Error('No user found');
    if (results.length && results[0][0].IsActive < 1) throw new Error('User not active.');

    const returnUser = results[0][0];
    delete returnUser.Usr_pwd;

    res.status(200).json({
      success: true,
      message: 'login success',
      data: returnUser,
      error: null,
    });
  } catch (error) {
    logger.error(`@login error ${error}`);
    res
      .status(500)
      .json({ success: false, message: error.message, data: null, error: error });
  }
};

module.exports = { login };
