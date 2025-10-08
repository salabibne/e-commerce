import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';  
@Schema({timestamps: true})

export class Profile extends Document{
    @Prop({default:'https://i.ibb.co.com/5WF2fLjk/default-Img.jpg'})
    image:string;

    @Prop({required:true})
    password:string;

    @Prop({enum:['user','admin'],default:'user'})
    role:string;

    @Prop({enum:['active','inactive'],default:'active'})
    status:string;
}

export const ProfileSchema=SchemaFactory.createForClass(Profile);