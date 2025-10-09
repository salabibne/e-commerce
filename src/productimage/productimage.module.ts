import { Module } from '@nestjs/common';
import { ProductimageService } from './productimage.service';
import { ProductimageController } from './productimage.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductImage, ProductImageSchema } from './schemas/productimage.schema';
import { ProductVariant, ProductVariantSchema } from '../productvariant/schemas/productvariant.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductImage.name, schema: ProductImageSchema },
      { name: ProductVariant.name, schema: ProductVariantSchema },
    ]),
  ],
  controllers: [ProductimageController],
  providers: [ProductimageService],
})
export class ProductimageModule {}
