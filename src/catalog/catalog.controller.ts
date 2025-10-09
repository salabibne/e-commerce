import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { CatalogService } from './catalog.service';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}


  @Get('category/:name')
  async getByCategory(@Param('name') name: string) {
    console.log("getByCategory",name);
    const data = await this.catalogService.getByCategoryName(name);
    if (!data) throw new NotFoundException('Category not found');
    return data;
  }


}
