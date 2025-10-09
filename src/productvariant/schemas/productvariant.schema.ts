import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class ProductVariant extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  productId: Types.ObjectId;

  @Prop({ type: String, required: false })
  size?: string; 

  @Prop({ type: Number, required: false })
  weight?: number; 

  @Prop({ required: true })
  color: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  lowStockAlert: number;
}

export const ProductVariantSchema =
  SchemaFactory.createForClass(ProductVariant);

// validation rule:
ProductVariantSchema.pre('validate', function (next) {
  if (!this.size && !this.weight) {
    return next(new Error('Either size or weight must be provided.'));
  }
  next();
});
