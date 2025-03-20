/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Expose, Transform, Type } from 'class-transformer';

export abstract class BaseSchema {
  @Expose()
  @Transform(({ obj }) => {
    // We have to return an id for unit test purpose
    return obj._id ? obj._id.toString() : obj.id;
  })
  public readonly id: string;

  @Type(() => Date)
  public readonly createdAt: Date;

  @Type(() => Date)
  public readonly updatedAt: Date;
}
