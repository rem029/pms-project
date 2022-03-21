import express from 'express';
import cors from 'cors';
import { loginRoute } from 'routes/loginRoutes';
import { userRoutes } from 'routes/userRoutes';

const initializeAppExpress = () => {
  const app = express();

  const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
  };

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors(corsOptions));

  app.use('/login', loginRoute);
  app.use('/user', userRoutes);

  //Default routes
  app.get('/', async (req, res) => {
    res.send(`<h1>Its online!!!</h1>`);
  });

  app.get('/favicon.ico', async (req, res) => {
    res.redirect('/');
  });

  return app;
};

export const app = initializeAppExpress();
