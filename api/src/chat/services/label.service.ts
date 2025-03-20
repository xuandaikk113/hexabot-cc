/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Injectable } from '@nestjs/common';

import { BaseService } from '@/utils/generics/base-service';

import { LabelDto } from '../dto/label.dto';
import { LabelRepository } from '../repositories/label.repository';
import { Label, LabelFull, LabelPopulate } from '../schemas/label.schema';

@Injectable()
export class LabelService extends BaseService<
  Label,
  LabelPopulate,
  LabelFull,
  LabelDto
> {
  constructor(readonly repository: LabelRepository) {
    super(repository);
  }
}
