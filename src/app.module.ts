import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module'  
import { RegistrationModule } from './registration/registration.module';
@Module({
  imports: [DatabaseModule, RegistrationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
