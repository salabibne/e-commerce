import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatalogService } from './catalog.service';
import { CatalogController } from './catalog.controller';
import { Category, CategorySchema } from '../category/schemas/category.schema';
import { Subcategory, SubcategorySchema } from '../subcategory/schemas/subcategory.schema';
import { Product, ProductSchema } from '../product/schemas/product.schema';
import {ProductVariant,ProductVariantSchema} from '../productvariant/schemas/productvariant.schema';
import {ProductImage,ProductImageSchema,} from '../productimage/schemas/productimage.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]),
    MongooseModule.forFeature([{ name: Subcategory.name, schema: SubcategorySchema }]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: ProductVariant.name, schema: ProductVariantSchema }]),
    MongooseModule.forFeature([{ name: ProductImage.name, schema: ProductImageSchema }]),
  ],
  controllers: [CatalogController],
  providers: [CatalogService],
})
export class CatalogModule {}
