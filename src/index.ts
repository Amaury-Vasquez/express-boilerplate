import cors from 'cors';
import express from 'express';

import { routerApi } from './routes/';
import {
  boomErrorHandler,
  errorHandler,
  logErrors,
} from './middlewares/errorHandler';

const app = express();

// dotenv expected to define port
const PORT = 5000;

//    Middlewares     //

// body parser
app.use(express.json());

// Cors
const whitelist = ['http://localhost:3000', 'http://localhost:5500'];
const options = {
  origin: (origin: string, callback: Function) => {
    if (whitelist.includes(origin)) callback(null, true);
    else callback(new Error('Not allowed'));
  },
};
app.use(cors(options));

// App routes
routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

// Defining port
app.listen(PORT, () =>
  console.log(`App currently running on http://localhost:${PORT}/`)
);
