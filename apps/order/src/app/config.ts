import { registerAs } from '@nestjs/config';
import Joi = require('joi');
import { validate } from '@my-workspace/config-helpers';

export interface OrderConfig {
  APP_PORT: number;
  APP_HOST: string;
  MONGO_URL: string;
  ORDER_SERVICE_HOST: string;
  ORDER_SERVICE_PORT: number;
}
export const orderSchema =
  process.env.ENV === 'dev'
    ? Joi.object({
        APP_PORT: Joi.number().default(3003),
        APP_HOST: Joi.string().default('localhost'),
        MONGO_URL: Joi.string().default('mongodb://mongo:27017/order'),
        ORDER_SERVICE_HOST: Joi.string().default('localhost'),
        ORDER_SERVICE_PORT: Joi.number().default(3004),
      })
    : Joi.object({
        APP_PORT: Joi.number().required(),
        APP_HOST: Joi.string().required(),
        MONGO_URL: Joi.string().required(),
        ORDER_SERVICE_HOST: Joi.string().required(),
        ORDER_SERVICE_PORT: Joi.number().required(),
      });

export const orderConfig = registerAs('order', () => validate(orderSchema));
