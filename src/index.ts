import express from 'express';

const app = express();
const port = 3000;

app.get('/', (request, response) => {
  return response.status(200).json({ message: 'Hello world!' });
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
