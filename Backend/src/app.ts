import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
const cookieParser = require('cookie-parser');
import bodyParser from 'body-parser';
import { connectToDatabase } from './config/db';
import authRoutes from './routes/authRoutes';

const app: Express = express();
const port: number = parseInt(process.env.PORT || '5000', 10);

// Connect to mongodb
connectToDatabase();

// Middleware
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173', // react app localhost url
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
authRoutes(app);

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
