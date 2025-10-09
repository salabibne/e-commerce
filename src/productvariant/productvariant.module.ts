import { Module } from '@nestjs/common';
import { ProductvariantService } from './productvariant.service';
import { ProductvariantController } from './productvariant.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ProductVariant,
  ProductVariantSchema,
} from './schemas/productvariant.schema';
import { Product , ProductSchema} from '../product/schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductVariant.name, schema: ProductVariantSchema },
      { name: Product.name, schema: ProductSchema },
    ]),
  ],
  controllers: [ProductvariantController],
  providers: [ProductvariantService],
})
export class ProductvariantModule {}
