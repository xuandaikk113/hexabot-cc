/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

import { Channel, channelDataSchema } from '../schemas/types/channel';

export function isChannelData(channel: Channel) {
  return channelDataSchema.safeParse(channel).success;
}

@ValidatorConstraint({ async: false })
export class ChannelDataValidator implements ValidatorConstraintInterface {
  validate(channel: Channel) {
    return isChannelData(channel);
  }
}

export function IsChannelData(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: ChannelDataValidator,
    });
  };
}
