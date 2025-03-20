/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Injectable } from '@nestjs/common';

import { BaseService } from '@/utils/generics/base-service';

import { DummyRepository } from '../repositories/dummy.repository';
import { Dummy } from '../schemas/dummy.schema';

@Injectable()
export class DummyService extends BaseService<Dummy> {
  constructor(readonly repository: DummyRepository) {
    super(repository);
  }
}
