import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './app/routes';
import { notFound } from './app/middlewares/norFound';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// application routes
app.use('/api/v1', router);

const test = (req: Request, res: Response) => {
  const message = `Patwari villa tenent managing server ${req.url}`;
  res.send(message);
};

app.get('/', test);

app.use(notFound);

export default app;
