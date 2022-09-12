import joi from 'joi';

const id = joi.string().uuid();
const imageUrl = joi.string().uri();
const name = joi.string().min(2).max(50);
const price = joi.number().integer().min(1);
const isBlocked = joi.bool();
// export const getProductSchema = joi.object({
//   id: id.required(),
// });

export class ProductSchemas {
  createOne = joi.object({
    id: id.required(),
    imageUrl: imageUrl.required(),
    name: name.required(),
    price: price.required(),
    isBlocked: isBlocked.optional(),
  });

  getOne = joi.object({
    id: id.required(),
  });

  updateOne = joi.object({
    name: name,
    price: price,
    imageUrl: imageUrl,
    isBlocked: isBlocked,
  });
}
