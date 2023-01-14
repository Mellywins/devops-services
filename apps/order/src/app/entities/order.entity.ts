import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;
@Schema()
export class Order {
  @Prop()
  id: number;
  @Prop()
  name: string;
  @Prop()
  price: number;
  @Prop()
  quantity: number;
  @Prop()
  status: string;
}
export const OrderSchema = SchemaFactory.createForClass(Order);
