import config from 'config';
import express, { Request, Response } from 'express';
import { globalErrorHandler } from './common/middlewares/globalErrorHandler';
import { Config } from './config';
import outreachRouter from './modules/outreach/router';
import cors from 'cors'

const app = express();

app.use(express.json());
app.use(cors())
app.get('/', (req: Request, res: Response) => {
    res.send({ message: Config.PORT });
});
app.use('/api/outreach', outreachRouter);
app.use(globalErrorHandler);

export default app;
