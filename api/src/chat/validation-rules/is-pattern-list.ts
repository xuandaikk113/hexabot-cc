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

import { Pattern, patternSchema } from '../schemas/types/pattern';

export function isPatternList(patterns: Pattern[]) {
  if (!Array.isArray(patterns)) {
    return false;
  }

  return patterns.every((pattern) => patternSchema.safeParse(pattern).success);
}

@ValidatorConstraint({ async: false })
export class PatternListValidator implements ValidatorConstraintInterface {
  validate(patterns: Pattern[]) {
    return isPatternList(patterns);
  }
}

export function IsPatternList(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: PatternListValidator,
    });
  };
}
