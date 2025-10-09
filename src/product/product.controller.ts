import { Controller ,Get,Post,Body,UseGuards,Req} from '@nestjs/common';
import { ProductService } from './product.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../auth/role.decorator';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role('admin')
  @Post('create')
  createProduct(@Body() body: any, @Req() req) {
    return this.productService.createProduct(body);
  }

  @Get('all')
  getAllProducts() {
    return this.productService.getAllProducts();
  }
}
