
import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminMiddleware } from 'src/middleware/admin.middleware';

@Module({
  controllers: [AdminController],
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AdminMiddleware).forRoutes(AdminController); // apply to all routes in this controller
  }
}
