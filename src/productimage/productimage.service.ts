import { Injectable , BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductImage } from './schemas/productimage.schema';
import { ProductVariant } from '../productvariant/schemas/productvariant.schema';
import { validateObjectId } from '../utility/validationId';

@Injectable()
export class ProductimageService {
    constructor(
        @InjectModel(ProductImage.name)
        private productImageModel: Model<ProductImage>,
        @InjectModel(ProductVariant.name)
        private productVariantModel: Model<ProductVariant>,
    ) {}

    async createProductImage(data: any) {
        try {
            const productVariantId = validateObjectId(
              data.productVariantId,
              'productVariantId',
            );
            // Check if product variant exists
            const checkProductVariantExists = await this.productVariantModel.findById(productVariantId);
            if (!checkProductVariantExists) {
                throw new BadRequestException('Product Variant does not exist');
            }   
            const newProductImage = new this.productImageModel({
                ...data,
                productVariantId,
            });
            return await newProductImage.save();
        } catch (error) {
            throw error;
        }
    }

    async getAllProductImages() {
        return this.productImageModel.find().populate('productVariantId').exec();
    }       

}
