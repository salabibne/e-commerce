import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ProductimageService } from './productimage.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../auth/role.decorator';

@Controller('product-image')
export class ProductimageController {
  constructor(private readonly productImageService: ProductimageService) {}
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role('admin')
  @Post('create')
  createProductImages(@Body() body: any, @Req() req) {
    return this.productImageService.createProductImage(body);
  }

  @Get('all')
  getAllImages() {
    return this.productImageService.getAllProductImages();
  }
}
