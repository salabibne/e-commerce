import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './schemas/category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async CreateCategory(name: string) {
    try {
      const newCategory = new this.categoryModel( name);
      return await newCategory.save();
    } catch (error) {
      throw error;
    }
  }

  async getAllCategories() {
    try {
      return await this.categoryModel.find().exec();
    } catch (error) {
      throw error;
    }
  }
}
