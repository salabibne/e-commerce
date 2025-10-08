

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class AddressBody{
   @Prop({ required: true })
  thana: string;

  @Prop({ required: true })
  district: string;

  @Prop({ required: true })
  fullAddress: string;
}

const AddressBodySchema = SchemaFactory.createForClass(AddressBody);

@Schema({ timestamps: true })
export class Address extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;
  @Prop({ type: AddressBodySchema, required: true })
  primary: AddressBody;
  @Prop({ type: AddressBodySchema })
  secondary: AddressBody;
}
export const AddressSchema = SchemaFactory.createForClass(Address);
  
  
