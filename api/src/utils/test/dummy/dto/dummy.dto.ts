/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { IsString } from 'class-validator';

export class DummyCreateDto {
  @IsString()
  dummy: string;
}
