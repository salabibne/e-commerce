// src/category/category.controller.ts
import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { CategoryService } from './category.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../auth/role.decorator';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role('admin')
  @Post('create')
  createCategory(@Body() body: any, @Req() req) {
    console.log('req.user from category:', req.user);
    return this.categoryService.CreateCategory(body);
  }

 
  @Get('all')
  getAll() {
    return this.categoryService.getAllCategories();
  }
}
