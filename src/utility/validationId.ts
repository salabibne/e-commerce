import { BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

export function validateObjectId(
  id: string | Types.ObjectId,
  fieldName = 'id',
): Types.ObjectId {
  let objectId: Types.ObjectId;

  if (typeof id === 'string') {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid ${fieldName}`);
    }
    objectId = new Types.ObjectId(id);
  } else {
    objectId = id;
  }

  return objectId;
}
