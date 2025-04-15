import 'dotenv/config';
import express from 'express';
import connectToDatabase from './config/db';

const app = express();

// app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'healthy',
  });
});

app.listen(4004, async () => {
  console.log('Server running on port 4004 in development environment');
  await connectToDatabase();
});
