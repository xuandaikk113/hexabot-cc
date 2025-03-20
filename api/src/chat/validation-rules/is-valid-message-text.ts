/*
 * Copyright © 2025 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { registerDecorator, ValidationOptions } from 'class-validator';

import {
    StdIncomingMessage,
    StdOutgoingTextMessage,
    validMessageTextSchema,
} from '../schemas/types/message';

export function IsValidMessageText(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(message: StdOutgoingTextMessage | StdIncomingMessage) {
          return validMessageTextSchema.safeParse(message).success;
        },
      },
    });
  };
}
