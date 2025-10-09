import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Category } from '../category/schemas/category.schema';
import { Subcategory } from '../subcategory/schemas/subcategory.schema';
import { Product } from '../product/schemas/product.schema';
import { ProductVariant } from '../productvariant/schemas/productvariant.schema';
import { ProductImage } from '../productimage/schemas/productimage.schema';

@Injectable()
export class CatalogService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(Subcategory.name) private subcategoryModel: Model<Subcategory>,
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(ProductVariant.name)
    private variantModel: Model<ProductVariant>,
    @InjectModel(ProductImage.name) private imageModel: Model<ProductImage>,
  ) {}

  // ✅ Get full nested catalog by Category name
  async getByCategoryName(name: string) {
    console.log("serve received",name);
    const category = await this.categoryModel.findOne( {name} ).lean();
    console.log("category",category);
    if (!category) throw new NotFoundException('Category not found');

    const subcategories = await this.subcategoryModel
      .find({ categoryId: category._id })
      .lean();
    const subcatIds = subcategories.map((s) => s._id);

    const products = await this.productModel
      .find({ subcategoryId: { $in: subcatIds } })
      .lean();
    const productIds = products.map((p) => p._id);

    const variants = await this.variantModel
      .find({ productId: { $in: productIds } })
      .lean();
    const variantIds = variants.map((v) => v._id);

    const images = await this.imageModel
      .find({ productVariantId: { $in: variantIds } })
      .lean();

    // Nest the data
    const nestedProducts = products.map((prod) => {
      const prodVariants = variants
        .filter((v) => v.productId.toString() === prod._id.toString())
        .map((v) => ({
          ...v,
          images: images.filter(
            (i) => i.productVariantId.toString() === v._id.toString(),
          ),
        }));
      return { ...prod, variants: prodVariants };
    });

    const nestedSubcategories = subcategories.map((sub) => ({
      ...sub,
      products: nestedProducts.filter(
        (p) => p.subcategoryId.toString() === sub._id.toString(),
      ),
    }));

    return { ...category, subcategories: nestedSubcategories };
  }

 
}
