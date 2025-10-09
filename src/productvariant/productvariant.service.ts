import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductVariant } from './schemas/productvariant.schema';
import { Product } from '../product/schemas/product.schema';    
import { validateObjectId } from '../utility/validationId';


@Injectable()
export class ProductvariantService {
  constructor(
    @InjectModel(ProductVariant.name)
    private productvariantModel: Model<ProductVariant>,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async createProductVariant(data: any) {
    try {
      const productId = validateObjectId(data.productId, 'productId');
      // Check if product exists
      const checkProductExists = await this.productModel.findById(productId);
      if (!checkProductExists) {
        throw new BadRequestException('Product does not exist');
      }
      const newProductVariant = new this.productvariantModel({
        ...data,
        productId,
      });
      return await newProductVariant.save();
    } catch (error) {
      throw error;
    }
  }

  async getAllProductVariants() {
    return this.productvariantModel.find().populate('productId').exec();
  }
}
