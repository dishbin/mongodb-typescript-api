import express from 'express';
import { connectToDatabase } from './db';
import { mountRoutes } from './routes';

const app = express();
const port = process.env.SERVER_PORT;

app.use(express.json());

connectToDatabase();
mountRoutes(app);

app.get('/', (req, res) => {
  res.send('wassup world');
});

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});

