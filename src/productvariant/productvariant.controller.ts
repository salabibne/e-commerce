import { Controller } from '@nestjs/common';
import { ProductvariantService } from './productvariant.service';

@Controller('productvariant')
export class ProductvariantController {
  constructor(private readonly productvariantService: ProductvariantService) {}
}
