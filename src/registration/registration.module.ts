import { Module } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { RegistrationController } from './registration.controller';
import {Profile,ProfileSchema} from '../profiles/schemas/profile.schema'
import {User,UserSchema} from '../users/schemas/user.schema'
import {Address,AddressSchema} from '../addresses/schemas/address.schema'
import {MongooseModule} from '@nestjs/mongoose'


@Module({
  imports:[
     MongooseModule.forFeature([
      { name: Profile.name, schema: ProfileSchema },
      { name: User.name, schema: UserSchema },
      { name: Address.name, schema: AddressSchema },
    ]),
  ],
  controllers: [RegistrationController],
  providers: [RegistrationService],
})
export class RegistrationModule {}
