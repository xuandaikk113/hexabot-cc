/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { BadRequestException } from '@nestjs/common';
import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

import { FieldType } from '../dto/contentType.dto';

@ValidatorConstraint({ name: 'validateRequiredFields', async: false })
export class ValidateRequiredFields implements ValidatorConstraintInterface {
  private readonly REQUIRED_FIELDS: FieldType[] = [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
    },
    {
      name: 'status',
      label: 'Status',
      type: 'checkbox',
    },
  ];

  validate(fields: FieldType[]): boolean {
    const errors: string[] = [];

    this.REQUIRED_FIELDS.forEach((requiredField, index) => {
      const field = fields[index];

      if (!field) {
        errors.push(`Field ${requiredField.name} is required.`);
        return;
      }

      Object.entries(requiredField).forEach(([key, value]) => {
        if (field[key] !== value) {
          errors.push(
            `fields.${index}.${key} must be ${value}, but got ${field[key]}`,
          );
        }
      });
    });

    if (errors.length > 0) {
      throw new BadRequestException({ message: errors });
    }

    return true;
  }

  defaultMessage(): string {
    return 'The fields must match the required structure.';
  }
}
