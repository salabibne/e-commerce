import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async findByEmail(email: string) {
        try{
            const user = await this.userModel.findOne({ email });
        return user;
        }
        catch (error) {
            return null;
        }
    
  }
}