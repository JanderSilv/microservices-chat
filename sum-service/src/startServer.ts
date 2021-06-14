import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';

const startServer = () => {
  const app = express();

  app.use(express.json());

  app.use(
    cors({
      origin: (origin, cb) => cb(null, true),
      credentials: true,
    })
  );

  app.post('/sum', async (req, res, next) => {
    if (!req.body.num1 || !req.body.num2) {
      return next(new Error('Invalid body!'));
    }

    const { num1, num2 } = req.body;

    return res.json(num1 + num2);
  });

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    return res.status(500).json({ message: err.message });
  });

  app.listen(7400, '0.0.0.0', () => {
    console.info(`Sum service listening on 7400`);
  });
};

export default startServer;
