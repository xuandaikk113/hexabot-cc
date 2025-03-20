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

import { CaptureVar, captureVarSchema } from '../schemas/types/capture-var';

export function isValidVarCapture(vars: CaptureVar[]) {
  if (!Array.isArray(vars)) {
    return false;
  }

  return vars.every(
    (captureVar) => captureVarSchema.safeParse(captureVar).success,
  );
}

@ValidatorConstraint({ async: false })
export class CaptureVarValidator implements ValidatorConstraintInterface {
  validate(vars: CaptureVar[]) {
    return isValidVarCapture(vars);
  }
}

export function IsVarCapture(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: CaptureVarValidator,
    });
  };
}
