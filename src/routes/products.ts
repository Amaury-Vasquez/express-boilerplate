import express, { NextFunction, Request, Response } from 'express';

import { ProductSchemas } from '../schemas/productSchema';
import { ProductService } from '../services/ProductService';
import { validationHandler } from '../middlewares/validationHandler';

const router = express.Router();

const service = new ProductService();

const { getOne } = new ProductSchemas();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const data = await service.findAll();
  res.status(200).send({
    data,
    message: 'Product list',
  });
});

router.get(
  '/:id',
  validationHandler(getOne, 'params'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.status(200).json(product);
    } catch (e) {
      next(e);
    }
  }
);

export default router;
