/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Injectable } from '@nestjs/common';

import { BaseSeeder } from '@/utils/generics/base-seeder';

import { ModelRepository } from '../repositories/model.repository';
import { Model, ModelFull, ModelPopulate } from '../schemas/model.schema';

@Injectable()
export class ModelSeeder extends BaseSeeder<Model, ModelPopulate, ModelFull> {
  constructor(private readonly modelRepository: ModelRepository) {
    super(modelRepository);
  }
}
