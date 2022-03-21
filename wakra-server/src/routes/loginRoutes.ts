import express from 'express';
import { loginController } from 'controllers/loginController';
import { authenticateLogin } from 'middlewares/authUser';

const initializeRouter = () => {
  const router = express.Router();

  router.get('/', authenticateLogin, loginController);

  return router;
};

export const loginRoute = initializeRouter();
