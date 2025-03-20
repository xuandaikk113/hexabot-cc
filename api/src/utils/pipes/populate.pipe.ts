/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class PopulatePipe implements PipeTransform<string, string[]> {
  transform(value: any, _metadata: ArgumentMetadata): string[] {
    if (!value || !value.populate) {
      return [];
    }

    const { populate } = value;
    const fields = populate.split(',').map((field: string) => field.trim());

    return fields;
  }
}
