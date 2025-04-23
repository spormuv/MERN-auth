import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import connectToDatabase from './config/db';
import { APP_ORIGIN, NODE_ENV, PORT } from './constants/env';
import { OK } from './constants/http';
import authenticate from './middleware/authenticate';
import errorHandler from './middleware/errorHandler';
import authRoutes from './routes/auth.route';
import userRoutes from './routes/user.route';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: APP_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());

app.get('/', (req, res, next) => {
  return res.status(OK).json({
    status: 'healthy',
  });
});

// auth routes
app.use('/auth', authRoutes);

// protected routes
app.use('/user', authenticate, userRoutes);

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT} in ${NODE_ENV} environment`);
  await connectToDatabase();
});
