import express, { Express } from 'express';

import products from './products';

export const routerApi = (app: Express) => {
  // Defines principal app route
  const router = express.Router();
  app.use('/api/v1', router);

  // Defines sub-routes
  router.use('/products', products);
};
