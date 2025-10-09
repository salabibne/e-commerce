import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Subcategory } from './schemas/subcategory.schema';
import { Category } from '../category/schemas/category.schema';

@Injectable()
export class SubcategoryService {
  constructor(
    @InjectModel(Subcategory.name) private subcategoryModel: Model<Subcategory>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async createSubcategory(data: any) {
    try {
        // Validate categoryId
      let categoryId: Types.ObjectId;
      if (typeof data.categoryId === 'string') {
        if (!Types.ObjectId.isValid(data.categoryId)) {
          throw new BadRequestException('Invalid categoryId');
        }
        categoryId = new Types.ObjectId(data.categoryId);
      } else {
        categoryId = data.categoryId;
      }

      // Check if category exists
      const checkCategoryExists = await this.categoryModel.findById(categoryId);
      if (!checkCategoryExists) {
        throw new BadRequestException('Category does not exist');
      }

      // Create subcategory with validated categoryId
      const newSubcategory = new this.subcategoryModel({
        ...data,
        categoryId, // ensure it's an ObjectId
      });

      return await newSubcategory.save();
    } catch (error) {
      throw error;
    }
  }

  async getAllSubcategories() {
    try{
        return await this.subcategoryModel.find().populate('categoryId').exec();
    }
    catch(error){
        throw error;
    }
  }
}
