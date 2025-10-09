import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module'  
import { RegistrationModule } from './registration/registration.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { AdminModule } from './admin/admin.module';
import { CategoryModule } from './category/category.module';
import { SubcategoryModule } from './subcategory/subcategory.module';
import { ProductModule } from './product/product.module';
import { ProductvariantModule } from './productvariant/productvariant.module';
import { ProductimageModule } from './productimage/productimage.module';
@Module({
  imports: [DatabaseModule, RegistrationModule, AuthModule, UserModule, AdminModule, CategoryModule, SubcategoryModule, ProductModule, ProductvariantModule, ProductimageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

