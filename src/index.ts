import express from 'express';

import { authRoutes } from './routes/auth';

const app = express();
const port = 3000;

app.use(authRoutes);

app.get('/', (request, response) => {
  return response.status(200).json({ message: 'Hello world!' });
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
