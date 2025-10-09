import {Prop,Schema,SchemaFactory} from '@nestjs/mongoose';
import {Document,Types} from 'mongoose';
import { ProductVariant } from 'src/productvariant/schemas/productvariant.schema';
import { Profile } from 'src/profiles/schemas/profile.schema'

@Schema({timestamps:true})
export class Order extends Document{
    @Prop({required:true})
    date:Date;
    @Prop({required:true})
    orderStatus:string;
    @Prop({required:true})
    totalAmount:number;
    @Prop({type:Types.ObjectId,ref:Profile.name,required:true})
    customerId:Types.ObjectId;
    
    @Prop({type:Types.ObjectId,ref:ProductVariant.name,required:true})
    productVariantOfOrderId:Types.ObjectId;


}