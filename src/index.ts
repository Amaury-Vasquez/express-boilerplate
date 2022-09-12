import express from 'express';
import { routerApi } from './routes/';

const app = express();

// dotenv expected to define port
const PORT = 5000;

// Body parser
app.use(express.json());

// App routes
routerApi(app);

// Defining port
app.listen(PORT, () =>
  console.log(`App currently running on http://localhost:${PORT}/`)
);
