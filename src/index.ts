import express from 'express';

import { authRoutes } from './routes/auth';
import { userRoutes } from './routes/user';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(authRoutes);
app.use(userRoutes);

app.get('/', (req, res) => res.status(200).json({ message: 'Hello world!' }));

app.listen(port, () => console.log(`App running on port ${port}`));
