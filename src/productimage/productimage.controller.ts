import { Controller } from '@nestjs/common';
import { ProductimageService } from './productimage.service';

@Controller('productimage')
export class ProductimageController {
  constructor(private readonly productimageService: ProductimageService) {}
}
