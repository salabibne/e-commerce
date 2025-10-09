import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model,Types } from 'mongoose';
import { Product } from './schemas/product.schema';
import { Subcategory } from '../subcategory/schemas/subcategory.schema';    
import { validateObjectId } from '../utility/validationId';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<Product>,
        @InjectModel(Subcategory.name) private subcategoryModel: Model<Subcategory>,
    ){}
    async createProduct(data: any){
        try{
            const subcategoryId = validateObjectId(data.subcategoryId, 'subcategoryId');

            // Check if subcategory exists
            const checkSubcategoryExists = await this.subcategoryModel.findById(subcategoryId);
            if(!checkSubcategoryExists){
                throw new BadRequestException('Subcategory does not exist');
            }
            const newProduct = new this.productModel({
                ...data,
                subcategoryId, 
            });
            return await newProduct.save();

        }
        catch(error){
            throw error;
        }

    }

    async getAllProducts(){
        return this.productModel.find().populate('subcategoryId').exec();
    }



}
