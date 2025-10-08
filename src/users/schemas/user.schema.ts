import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document,Types} from 'mongoose';

@Schema({timestamps: true})
export class User extends Document{
    @Prop({type:Types.ObjectId,ref:'Profile',required:true,unique:true})
    profileId : Types.ObjectId

    @Prop({required:true})
    name : string 

    @Prop({required:true,unique:true})
    email : string

    @Prop({required:true})
    password:string;

    @Prop({required:true})
    phoneNumber : string

    @Prop()
    secondaryPhoneNumber : string
}

export const UserSchema=SchemaFactory.createForClass(User);