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

import { Position, positionSchema } from '../schemas/types/position';

export function isPosition(position: Position) {
  return positionSchema.safeParse(position).success;
}

@ValidatorConstraint({ async: false })
export class PositionValidator implements ValidatorConstraintInterface {
  validate(position: Position) {
    return isPosition(position);
  }
}

export function IsPosition(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: PositionValidator,
    });
  };
}
