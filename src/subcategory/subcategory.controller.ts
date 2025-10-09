import { Controller,Get,Post,Body,UseGuards,Req } from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../auth/role.decorator';


@Controller('subcategory')
export class SubcategoryController {
  constructor(private readonly subcategoryService: SubcategoryService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role('admin')
  @Post('create')
  createSubcategory(@Body() body: any, @Req() req) {
    console.log('req.user from subcategory:', req.user);
    return this.subcategoryService.createSubcategory(body);
  }

  @Get('all')
  getAll() {
    return this.subcategoryService.getAllSubcategories();
  }
}
