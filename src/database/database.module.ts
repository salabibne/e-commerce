import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import mongoose from 'mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('MONGO_URI');
        if (!uri) {
          console.error(' MONGO_URI is not found');
          process.exit(1); 
        }

        // Optional: add connection listeners
        mongoose.connection.once('open', () => {
          console.log('MongoDB connected successfully!');
        });

        mongoose.connection.on('error', (err) => {
          console.error(' MongoDB connection error:', err);
        });

        return { uri };
      },
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
