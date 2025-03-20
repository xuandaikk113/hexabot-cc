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

import {
    BlockMessage,
    blockMessageObjectSchema,
} from '../schemas/types/message';

export function isValidMessage(msg: any) {
  return blockMessageObjectSchema.safeParse(msg).success;
}

@ValidatorConstraint({ async: false })
export class MessageValidator implements ValidatorConstraintInterface {
  validate(msg: BlockMessage) {
    return isValidMessage(msg);
  }
}

export function IsMessage(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: MessageValidator,
    });
  };
}
