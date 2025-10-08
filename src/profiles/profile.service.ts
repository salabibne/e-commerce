import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile } from './schemas/profile.schema';

@Injectable()
export class ProfileService {
    constructor(@InjectModel(Profile.name) private profileModel: Model<Profile>) {}

    async findProfileByID(id: string) {
        try{
            const profile = await this.profileModel.findById(id);
            console.log("profileService",profile);
        return profile;
        }
        catch (error) {
            return null;
        }
    
  }
}