import express from 'express';
import { query, getClient } from './db/index.js';
import { mountRoutes } from './routes/index.js';

const app = express();
const port = process.env.SERVER_PORT;

app.use(express.json());

mountRoutes(app);

app.get('/', (req, res) => {
  res.send('wassup world');
});

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});

