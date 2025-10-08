import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module'  
import { RegistrationModule } from './registration/registration.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
@Module({
  imports: [DatabaseModule, RegistrationModule, AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

