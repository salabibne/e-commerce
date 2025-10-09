import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class ProductImage extends Document {
  @Prop({ type: Types.ObjectId, ref: 'ProductVariant', required: true })
  productVariantId: Types.ObjectId;

  @Prop({ required: true })
  imageUrl: [string];

  @Prop()
  description: string;
}

export const ProductImageSchema = SchemaFactory.createForClass(ProductImage);