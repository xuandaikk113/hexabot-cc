/*
 * Copyright © 2024 Hexastack. All rights reserved.
 *
 * Licensed under the GNU Affero General Public License v3.0 (AGPLv3) :
 * 1. .
 * 2. .
 */

import { Injectable } from '@nestjs/common';

import { BaseSeeder } from '@/utils/generics/base-seeder';

import { ContextVarDto } from '../dto/context-var.dto';
import { ContextVarRepository } from '../repositories/context-var.repository';
import { ContextVar } from '../schemas/context-var.schema';

@Injectable()
export class ContextVarSeeder extends BaseSeeder<
  ContextVar,
  never,
  never,
  ContextVarDto
> {
  constructor(private readonly contextVarRepository: ContextVarRepository) {
    super(contextVarRepository);
  }
}
