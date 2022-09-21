import express, { NextFunction, Request, Response } from 'express';

import { ProductSchemas } from '../schemas/productSchema';
import { ProductService } from '../services/ProductService';
import { validationHandler } from '../middlewares/validationHandler';

const router = express.Router();

const service = new ProductService();

const { createOne, getOne, updateOne } = new ProductSchemas();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await service.findAll().then((data) =>
      res.status(200).json({
        data,
        message: 'Product list',
      })
    );
  } catch (e) {
    next(e);
  }
});

router.get(
  '/:id',
  validationHandler(getOne, 'params'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await service
        .findOne(id)
        .then((product) => res.status(200).json(product));
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  '/',
  validationHandler(createOne, 'body'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      await service
        .create(body)
        .then((newProduct) => res.status(201).json(newProduct));
    } catch (e) {
      next(e);
    }
  }
);

router.delete(
  '/:id',
  validationHandler(getOne, 'params'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await service
        .deleteOne(id)
        .then((deletedId) => res.status(200).json(deletedId));
    } catch (e) {
      next(e);
    }
  }
);

router.patch(
  '/:id',
  validationHandler(getOne, 'params'),
  validationHandler(updateOne, 'body'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body, params } = req;
      const { id } = params;

      await service
        .updateOne(id, body)
        .then((updatedProduct) => res.status(200).json(updatedProduct));
    } catch (e) {
      next(e);
    }
  }
);

export default router;
