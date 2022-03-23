import express from 'express';
import { getUserInfoController } from '../controllers/userController';
import { authenticateToken } from '../middlewares/authToken';

const initializeRouter = () => {
  const router = express.Router();

  router.get('/', authenticateToken, getUserInfoController);

  return router;
};

export const userRoutes = initializeRouter();
