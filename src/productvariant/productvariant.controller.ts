import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ProductvariantService } from './productvariant.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../auth/role.decorator';


@Controller('productvariant')
export class ProductvariantController {
  constructor(private readonly productvariantService: ProductvariantService) {}
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role('admin')
  @Post('create')
  createProductVariant(@Body() body: any, @Req() req) {
    return this.productvariantService.createProductVariant(body);
  }

  @Get('all')
  getAllProducts() {
    return this.productvariantService.getAllProductVariants();
  }
}
