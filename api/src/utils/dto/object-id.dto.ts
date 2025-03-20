/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class ObjectIdDto {
  @Type(() => Types.ObjectId)
  @IsNotEmpty({ message: 'Invalid ObjectId' })
  id: string;
}
