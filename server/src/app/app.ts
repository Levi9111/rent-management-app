import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app: Application = express();

// Todo: add cors
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// application routes
// app.use('/api/v1', router);

const test = (req: Request, res: Response) => {
  const message = `Patwari vila tenent managing server ${req.url}`;
  res.send(message);
};

app.get('/', test);


export default app;
