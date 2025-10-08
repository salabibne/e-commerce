import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/schemas/user.schema';
import { Profile } from '../profiles/schemas/profile.schema';
import { Address } from '../addresses/schemas/address.schema';
import * as bcrypt from 'bcrypt';
@Injectable()
export class RegistrationService {
    constructor(
        @InjectModel(Profile.name) private readonly profileModel: Model<Profile>,
        @InjectModel(User.name) private readonly userModel: Model<User>,
        @InjectModel(Address.name) private readonly addressModel: Model<Address>,
    ) {}

    // registration
    async register(data){
      
        try{
            const hashedPassword = await bcrypt.hash(data.user.password, 10);

        
            // Create Profile
            const profile = await this.profileModel.create({...data.profile});

            // Create User and linked to the profile 
            const user = await this.userModel.create({...data.user,password:hashedPassword, profileId: profile._id});

            // Create Address and linked to the user
            const address = await this.addressModel.create({...data.addresses, userId: user._id});


       
      
      return{
        message: 'Registration successful',
       profile: profile,
        user: user,
      }
      
        
        }
        catch (error) {
            return { message: 'Registration failed', error: error.message };
    }


    }

}
