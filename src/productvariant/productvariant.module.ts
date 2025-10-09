import { Module } from '@nestjs/common';
import { ProductvariantService } from './productvariant.service';
import { ProductvariantController } from './productvariant.controller';

@Module({
  controllers: [ProductvariantController],
  providers: [ProductvariantService],
})
export class ProductvariantModule {}
